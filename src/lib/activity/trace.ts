import { OftypesError } from 'oftypes'
import { inspect } from 'util'
import { default as Generator } from './functions/generator.js'

export const trace_options: Activity.TraceOptions = {
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
export async function trace( ...data: [ unknown ] ): Promise<string | OftypesError> {

  const generator: Generator = new Generator( data, 'trace', 'data' )

  let type: null | Error
  for await ( const check of generator.boolean( trace_options.mute ) )
    type = check

  const error: boolean = type instanceof Error
  const inspected: string = inspect( data[ 0 ], trace_options )

  if ( error )
    trace_options.mute = false

  if ( !trace_options.mute && !error )
    console.trace( inspected )

  return new Promise( ( resolve, reject ): void => {

    if ( type instanceof Error ) reject( type )
    resolve( inspected )
  } )
}
