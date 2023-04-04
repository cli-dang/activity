import { Dang } from '@cli-dang/decors'
import { error_, number_, oftype_, OftypesError } from 'oftypes'
import { stderr_exit_text, stderr_trace_text } from './text/code'

export default class activity_generator{

  private async * string_buffer( message, module:string, argument:string ):AsyncGenerator{
    yield await oftype_( message ) === 'Buffer' ||
    await oftype_( message ) === 'String'
      ? null
      : new OftypesError( Dang.b_red( await stderr_exit_text( message, module, argument ) ) )
  }

  public async * type_check( message:Buffer|string, error_type?:undefined|Error, exit_code?:undefined|number ):AsyncGenerator{

    const module:string = error_type ? 'exit' : 'stderr'

    let type:null|Error
    for await ( const check of this.string_buffer( message, module, 'message' ) ) {
      if ( check instanceof Error ) {
        type = check
        break
      }
      type = <null> check
    }

    yield type instanceof Error
      ? type
      : null

    if( error_type && exit_code ) {

      yield await error_( error_type )
        ? null
        : new OftypesError( Dang.b_red( await stderr_exit_text( error_type, module, 'error_type' ) ) )

      yield await number_( exit_code, undefined, undefined, false )
        ? null
        : new OftypesError( Dang.b_red( await stderr_exit_text( exit_code, module, 'exit_code' ) ) )
    }
  }

  public async * boolean( variable:unknown, module ):AsyncGenerator{

    yield variable.constructor.name === 'Boolean'
      ? null
      : new OftypesError( Dang.b_red( await stderr_trace_text( variable, module ) ) )
  }
}
