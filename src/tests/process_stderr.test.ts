import { AssertionError } from 'assert'
import * as assert from 'node:assert/strict'
import { OftypesError } from 'oftypes'
import * as tttt from 'trythistrythat'
import { stderr } from '../lib/activity/stderr.js'

export default async ( id: string ): Promise<void> => {

  let success: boolean = true
  let result: string | undefined = undefined
  const UNITName: string = 'String doesn\'t throws/rejects'

  try {
    await assert.doesNotReject( stderr( 'process.stderr.write({String})\n', true ) )

  } catch ( AssertionError ) {
    success = false
    result = AssertionError.message
    tttt.failed( UNITName )
  }

  tttt.end( id, success, UNITName, result )
}

export async function argument_message_buffer_not_rejects( id: string ): Promise<void> {

  let success: boolean = true
  let result: string | undefined = undefined
  const UNITName: string = 'Buffer doesn\'t throws/rejects'

  try {
    await assert.doesNotReject( stderr( Buffer.from( 'process.stderr.write({Buffer})\n' ), true ) )

  } catch ( AssertionError ) {
    success = false
    result = AssertionError.message
    tttt.failed( UNITName )
  }

  tttt.end( id, success, UNITName, result )
}

export async function argument_message_number_rejects( id: string ): Promise<void> {

  let success: boolean = true
  let result: string | undefined = undefined
  const UNITName: string = 'Number throws/rejects'

  try {
    // @ts-ignore: @test
    await assert.rejects( stderr( 3 ) )

  } catch ( AssertionError ) {
    success = false
    result = AssertionError.message
    tttt.failed( UNITName )
  }

  tttt.end( id, success, UNITName, result )
}

export async function stderr_resolves_message( id: string ): Promise<void> {

  let success: boolean = true
  let error: string | undefined = undefined

  const UNITName: string = 'message is resolved always'
  const message: string | Buffer | OftypesError = await stderr( 'message is resolved always', true )
  const result: boolean | AssertionError = await tttt.deepStrictEqual( async (): Promise<TTTTResolversType> => {

    return tttt.resolvers( message, 'message is resolved always' )
  } )

  if ( result instanceof Error ) {
    tttt.failed( 'stderr async function always resolves with message' )
    success = false
    error = result.message
  }

  tttt.end( id, success, UNITName, error )
}

export async function stderr_resolves_mute( id: string ): Promise<void> {

  let success: boolean = true
  let result: string | undefined = undefined
  const UNITName: string = 'rejects mute not boolean'

  try {
    // @ts-ignore: @test
    await assert.rejects( stderr( 'message is string', 'mute MUST be boolean' ) )

  } catch ( AssertionError ) {
    success = false
    result = AssertionError.message
    tttt.failed( UNITName )
  }

  tttt.end( id, success, UNITName, result )
}
