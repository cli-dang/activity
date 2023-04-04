import { default as Generator } from './functions/generator'
import { inspect } from 'util'
import { OftypesError } from 'oftypes'

export const trace_options: TraceOptions = {
  mute: false,
  colors: true,
  depth: Infinity,
  showHidden: false
}

/**
 * Note:
 * **console.trace() prints to stderr**
 * in case of spawning a child process, that use @cli-dang/activity.trace() to print 'whatever'
 *
 * keep in mind that 'whatever' is emitted by the 'event' 'data' of child.stderr.on
 *
 * @example
 * import {spawn} from 'node:child_process'
 *
 * const trace = spawn( 'path/to/executable.js' )
 * trace.stderr.on( 'data', buf => {
 *    console.log(`${buf}`)
 * } )
 *
 */
export async function trace ( ...data:[unknown]  ):Promise<null|string|OftypesError>{

  const generator = new Generator()

  let type:unknown
  for await ( const check of generator.boolean( trace_options.mute, 'trace' ) )
    type = check

  const error = type instanceof Error
  const inspected = inspect( data[ 0 ], trace_options )

  if( error )
    trace_options.mute = false

  if( ! trace_options.mute && ! error )
    console.trace( inspected )

  return new Promise( ( resolve, reject ) => {

    if( type instanceof Error ) reject( type )
    resolve( inspected )
  } )
}