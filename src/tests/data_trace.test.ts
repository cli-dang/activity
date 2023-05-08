import assert from 'node:assert/strict'
import * as tttt from 'trythistrythat'
import { trace, trace_options } from '../lib/activity/trace.js'

export default async ( id: string ): Promise<void> => {

  let success: boolean = true
  let result: string | undefined = undefined
  const UNITName: string = 'trace rejects mute not boolean'

  try {
    // @ts-ignore: @test
    trace_options.mute = 'false'
    // @ts-ignore: @test
    await assert.rejects( trace( 'message is string' ) )

  } catch ( AssertionError ) {
    success = false
    result = AssertionError.message
    tttt.failed( UNITName )
  }

  tttt.end( id, success, UNITName, result )
}

export async function data_trace_inspect( id: string ): Promise<void> {

  let success: boolean = true
  let message: string | undefined = undefined
  const UNITName: string = 'trace inspect returns'

  trace_options.mute = false
  trace_options.colors = false
  trace_options.depth = 3
  trace_options.showHidden = false

  const result: boolean | Error = await tttt.deepStrictEqual( async (): Promise<TTTTResolversType> => {

    const actual: string | Error = await trace( [ 1, 2, 3, 4 ] )
    const expected: string = '[ 1, 2, 3, 4 ]'

    return tttt.resolvers( actual, expected )
  } )

  if ( result instanceof Error ) {
    success = false
    message = result.message
    tttt.failed( UNITName )
  }

  tttt.end( id, success, UNITName, message )
}

export async function data_trace_complex( id: string ): Promise<void> {

  let success: boolean = true
  let message: string | undefined = undefined
  const UNITName: string = 'trace inspect returns'

  const result: boolean | Error = await tttt.deepStrictEqual( async (): Promise<TTTTResolversType> => {

    const actual: string | Error = await trace( [ 'data', { ...'string' as {} }  ] )
    const expected: string = `[
  'data',
  { '0': 's', '1': 't', '2': 'r', '3': 'i', '4': 'n', '5': 'g' }
]`

    return tttt.resolvers( actual, expected )
  } )

  if ( result instanceof Error ) {
    success = false
    message = result.message
    tttt.failed( UNITName )
  }

  tttt.end( id, success, UNITName, message )
}
