import { default as Generator } from './functions/generator.js'
import { OftypesError } from 'oftypes'
import { stderr } from './stderr.js'

export async function exit( message: MessageArgument, error_type = new Error( `${process.title} ♠ error - internal` ), exit_code = 1, process_exit = true, mute = false )
  :Promise<OftypesError|string> {

  const generator = new Generator()
  let type:null|Error
  for await ( const check of generator.type_check( message, error_type, exit_code ) ) {

    if( check instanceof Error ) {
      type = check
      break
    }
    type = <null> check
  }

  if( !( type instanceof Error ) && process_exit && ! mute )
    await stderr( `\n${ message }\n\n          [stacktrace]\n          ${ error_type.stack }\n\n` )

  return new Promise( ( resolve, reject ) => {

    if( type instanceof Error ) reject( type )

    else if( ! process_exit  ) resolve( `\n${message}\n\n          [stacktrace]\n          ${error_type.stack}\n exit code -> ${exit_code}\n\n` )

    else process.exit( exit_code )
  } )
}