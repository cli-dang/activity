import { default as Generator } from './functions/generator'
import { OftypesError } from 'oftypes'

export async function stderr( message:MessageArgument, mute = false ):Promise<Buffer|string|OftypesError>{

  const generator = new Generator()
  const errors:boolean[] = []

  let string_buffer: unknown
  for await ( const check of generator.type_check( message ) )
    string_buffer = check

  if( string_buffer instanceof Error )
    errors.push( true )

  let boolean: unknown
  for await ( const check of generator.boolean( mute, 'stderr' ) )
    boolean = check

  if( boolean instanceof Error )
    errors.push( true )

  return new Promise( ( resolve, reject ) => {

    if( errors.length > 0 ) reject( [ string_buffer, boolean ].join( '\n' ) )
    else if( ! mute )
      process.stderr.write( message )
    resolve( message )

  } )
}