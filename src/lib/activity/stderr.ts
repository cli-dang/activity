import { OftypesError } from 'oftypes'
import { default as Generator } from './functions/generator.js'

export async function stderr( message: Activity.MessageArgument, mute: boolean = false ): Promise<Buffer | string | OftypesError> {

  const generator: Generator = new Generator( message, 'stderr', 'message' )
  const errors: boolean[] = []

  let string_buffer: null | Error
  for await ( const check of generator.type_check() )
    string_buffer = check

  if ( string_buffer instanceof Error )
    errors.push( true )

  let boolean: null | Error
  for await ( const check of generator.boolean( mute ) )
    boolean = check

  if ( boolean instanceof Error )
    errors.push( true )

  return new Promise( ( resolve, reject ): void => {

    if ( errors.length > 0 ) reject( [ string_buffer, boolean ].join( '\n' ) )
    else if ( !mute )
      process.stderr.write( message )
    resolve( message )

  } )
}
