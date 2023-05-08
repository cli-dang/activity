import * as child_process from 'child_process'
import { spawn } from 'node:child_process'
import * as tttt from 'trythistrythat'
import { URL } from 'url'

const __dirname: string = new URL( '.', import.meta.url ).pathname

export default async function ( id: string ): Promise<void> {

  let success: boolean
  let result: unknown | Error
  const error: string[] = []
  const UNITName: string = 'exit process with message and exit code 4'

  const node: child_process.ChildProcess = spawn( `${ __dirname }processes/process.exit.test.js`, { stdio: [ 'ignore', 'inherit', 'ignore', 'ipc' ] } )

  let exitedProcessMessage: child_process.Serializable | undefined = undefined

  node.send( id )
  node.on( 'message', ( message: child_process.Serializable ): void => { exitedProcessMessage = message } )
  node.on( 'exit', async ( code: number ): Promise<void> => {

    result = await tttt.deepStrictEqual( async (): Promise<TTTTResolversType> => {

      return tttt.resolvers( exitedProcessMessage, id )
    } )

    if ( result instanceof Error ) {
      success = false
      error.push( result.message )
    }

    result = await tttt.deepStrictEqual( async (): Promise<TTTTResolversType> => {

      return tttt.resolvers( code, 4 )
    } )

    if ( result instanceof Error ) {
      success = false
      tttt.failed( UNITName )
      error.push( result.message )
    }

    tttt.end( id, success, UNITName, error.join( '\n' ) )
  } )
}
