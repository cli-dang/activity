import * as child_process from 'child_process'
import * as tttt from 'trythistrythat'
import { spawn } from 'node:child_process'
import { URL } from 'url'

// @ts-ignore
const __dirname = new URL( '.', import.meta.url ).pathname

export default async function ( id ){

  let success = true
  let result:unknown|Error = undefined
  const error:[] = []
  const UNITName = 'exit process with message and exit code 4'

  const node:child_process.ChildProcessWithoutNullStreams = spawn( `${__dirname}processes/process.exit.test.js`, { stdio:[ 'ignore', 'inherit', 'ignore', 'ipc' ] } )

  let exitedProcessMessage:child_process.Serializable|undefined = undefined

  node.send( id )
  node.on( 'message', message => exitedProcessMessage = message )
  node.on( 'exit', async code => {

    result = await tttt.deepStrictEqual( async () => {

      return tttt.resolvers( exitedProcessMessage, id )
    } )

    if( result instanceof Error ){
      success = false
      error.push( <never> result.message )
    }

    result = await tttt.deepStrictEqual( async () => {

      return tttt.resolvers( code, 4 )
    } )

    if( result instanceof Error ){
      success = false
      tttt.failed ( UNITName )
      error.push( <never> result.message )
    }

    tttt.end( id, success, UNITName, error.join( '\n' ) )
  } )
}
