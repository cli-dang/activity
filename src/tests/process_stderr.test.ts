import * as assert from 'node:assert/strict'
import * as tttt from 'trythistrythat'
import { AssertionError } from 'assert'
import { stderr } from '../lib/activity/stderr'

export default async ( id ) => {

  let success = true
  let result:string|undefined = undefined
  const UNITName = 'String doesn\'t throws/rejects'

  try {
    await assert.doesNotReject( stderr( 'process.stderr.write({String})\n', true ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.message
    tttt.failed ( UNITName )
  }

  tttt.end( id, success, UNITName, result )
}

export async function argument_message_buffer_not_rejects ( id ){

  let success = true
  let result:string|undefined = undefined
  const UNITName = 'Buffer doesn\'t throws/rejects'

  try {
    await assert.doesNotReject( stderr( Buffer.from( 'process.stderr.write({Buffer})\n' ), true ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.message
    tttt.failed ( UNITName )
  }

  tttt.end( id, success, UNITName, result )
}

export async function argument_message_number_rejects ( id ){

  let success = true
  let result:string|undefined = undefined
  const UNITName = 'Number throws/rejects'

  try {
    // @ts-ignore
    await assert.rejects( stderr( 3 ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.message
    tttt.failed ( UNITName )
  }

  tttt.end( id, success, UNITName, result )
}
export async function stderr_resolves_message( id ){

  let success = true
  let error: string|undefined = undefined

  const UNITName = 'message is resolved always'

  const message = await stderr( 'message is resolved always', true )

  const result:boolean|AssertionError = await tttt.deepStrictEqual( async () => {

    return tttt.resolvers( message, 'message is resolved always' )
  } )

  if( result instanceof Error ){
    tttt.failed ( 'stderr async function always resolves with message' )
    success = false
    error = result.message
  }

  tttt.end( id, success, UNITName, error )
}
export async function stderr_resolves_mute( id ){

  let success = true
  let result:string|undefined = undefined
  const UNITName = 'rejects mute not boolean'

  try {
    // @ts-ignore
    await assert.rejects( stderr( 'message is string', 'mute MUST be boolean' ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.message
    tttt.failed ( UNITName )
  }

  tttt.end( id, success, UNITName, result )
}