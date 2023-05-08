import * as child_process from 'child_process'
import { spawn } from 'node:child_process'
import { EventEmitter } from 'node:events'
import * as tttt from 'trythistrythat'

const processEnd: EventEmitter = new EventEmitter()

export default async function ( id: string ): Promise<void> {

  let result: boolean | Error
  const error: string[] = []
  const UNITName: string = 'trace_data_output'

  processEnd.on( 'exit', (): void => {
    if ( error.length > 0 )
      tttt.failed( UNITName )

    tttt.end( id, error.length === 0, UNITName, error.join( '\n' ) )
  } )

  const node: child_process.ChildProcess = spawn( `${ process.cwd() }/tests/processes/process.trace.test.js`, { stdio: [ null, null, null, 'ipc' ] } )

  let tracedProcessMessage: child_process.Serializable | undefined = undefined

  node.send( id )
  node.stderr.on( 'data', async ( trace_output: Buffer ): Promise<void> => {
    result = await tttt.deepStrictEqual( async (): Promise<TTTTResolversType> => {
      const trace_output_actual = trace_output.subarray( 0, trace_output.indexOf( '\n' ) )
      const trace_output_expected: Buffer = Buffer.from( `Trace: [ \x1B[33m${ node.pid }\x1B[39m, \x1B[32m'${ id }'\x1B[39m, \x1B[32m'testing trace_data output'\x1B[39m ]` )

      return tttt.resolvers( trace_output_expected, trace_output_actual )
    } )

    if ( result instanceof Error )
      error.push( result.message )

  } )
  node.on( 'message', ( message: child_process.Serializable ): void => {tracedProcessMessage = message} )
  node.on( 'exit', async ( code: number ): Promise<void> => {

    result = await tttt.deepStrictEqual( async (): Promise<TTTTResolversType> => {

      return tttt.resolvers( tracedProcessMessage, id )
    } )

    if ( result instanceof Error )
      error.push( result.message )

    result = await tttt.deepStrictEqual( async (): Promise<TTTTResolversType> => {

      return tttt.resolvers( code, 0 )
    } )

    if ( result instanceof Error )
      error.push( result.message )

    processEnd.emit( 'exit' )
  } )
}
