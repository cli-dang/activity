import { OftypesError } from 'oftypes'
import { default as Generator } from './functions/generator.js'
import { stderr } from './stderr.js'

export async function exit( message: Activity.MessageArgument, error_type: Error = new Error( `${ process.title } ♠ error - internal` ), exit_code: number = 1, process_exit: boolean = true, mute: boolean = false ): Promise<OftypesError | string> {

  const generator: Generator = new Generator( message, 'exit', 'exit_code' )
  let type: null | Error
  for await ( const check of generator.type_check( error_type, exit_code ) ) {

    if ( check instanceof Error ) {
      type = check
      break
    }
    type = check
  }

  if ( !( type instanceof Error ) && process_exit && !mute )
    await stderr( `\n${ message }\n\n          [stacktrace]\n          ${ error_type.stack }\n\n` )

  return new Promise( ( resolve, reject ): void => {

    if ( type instanceof Error ) reject( type )

    else if ( !process_exit ) resolve( `\n${ message }\n\n          [stacktrace]\n          ${ error_type.stack }\n exit code -> ${ exit_code }\n\n` )

    else process.exit( exit_code )
  } )
}
