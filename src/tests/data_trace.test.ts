import * as tttt from 'trythistrythat'
import assert from 'node:assert/strict'
import { trace, trace_options } from '../lib/activity/trace'

export default async ( id ) => {

  let success = true
  let result:string|undefined = undefined
  const UNITName = 'trace rejects mute not boolean'

  try {
    // @ts-ignore
    trace_options.mute = 'false'
    // @ts-ignore
    await assert.rejects( trace( 'message is string' ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.message
    tttt.failed ( UNITName )
  }

  tttt.end( id, success, UNITName, result )
}

export async function data_trace_inspect ( id ){

  let success = true
  let message:string|undefined = undefined
  const UNITName = 'trace inspect returns'

  trace_options.mute = false
  trace_options.colors = false
  trace_options.depth = 3
  trace_options.showHidden = false

  const result:boolean|Error = await tttt.deepStrictEqual( async () => {

    const actual:string|Error = await trace( [ 1, 2, 3, 4 ] )
    const expected = '[ 1, 2, 3, 4 ]'

    return tttt.resolvers( actual, expected )
  } )

  if( result instanceof Error ){
    success = false
    message = result.message
    tttt.failed ( UNITName )
  }

  tttt.end( id, success, UNITName, message )
}

export async function data_trace_complex ( id ){

  let success = true
  let message:string|undefined = undefined
  const UNITName = 'trace inspect returns'

  const result:boolean|Error = await tttt.deepStrictEqual( async () => {

    const actual:string|Error = await trace( [ 'data', { ...'string' as {} } ] )
    const expected = `[
  'data',
  { '0': 's', '1': 't', '2': 'r', '3': 'i', '4': 'n', '5': 'g' }
]`

    return tttt.resolvers( actual, expected )
  } )

  if( result instanceof Error ){
    success = false
    message = result.message
    tttt.failed ( UNITName )
  }

  tttt.end( id, success, UNITName, message )
}