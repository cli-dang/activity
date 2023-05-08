import { Dang } from '@cli-dang/decors'
import { error_, number_, oftype_, OftypesError } from 'oftypes'
import { stderr_exit_text, stderr_trace_text } from './text/code.js'

export default class Generator {

  private readonly module: string
  private argument: string
  private readonly data: string|Buffer|unknown

  constructor( data: string|Buffer|unknown, module: string, argument: string ) {
    this.data = data
    this.module = module
    this.argument = argument
  }

  private async* string_OR_buffer(): AsyncGenerator<null | OftypesError, void, void> {
    this.argument = 'message'
    yield await oftype_( this.data, { Buffer: true } )
      ? null
      : await oftype_( this.data, { String: true } ) === true
        ? null
        : new OftypesError( Dang.b_red( await stderr_exit_text( this.data, this.module, this.argument ) ) )
  }

  public async* type_check( error_type?: undefined | Error, exit_code?: undefined | number ): AsyncGenerator<null | Error, void, void> {

    let type: null | Error
    for await ( const check of this.string_OR_buffer() ) {
      if ( check instanceof Error ) {
        type = check
        break
      }
      type = check
    }

    yield type instanceof Error
      ? type
      : null

    if ( error_type && exit_code ) {

      this.argument = 'error_type'
      yield await error_( error_type )
        ? null
        : new OftypesError( Dang.b_red( await stderr_exit_text( error_type, this.module, this.argument ) ) )

      this.argument = 'exit_code'
      yield await number_( exit_code, undefined, undefined, false )
        ? null
        : new OftypesError( Dang.b_red( await stderr_exit_text( exit_code, this.module, this.argument ) ) )
    }
  }

  public async* boolean( variable: unknown ): AsyncGenerator<null | OftypesError, void, void> {

    yield await oftype_( variable, { Boolean: true } ) === true
      ? null
      : new OftypesError( Dang.b_red( await stderr_trace_text( variable, this.module ) ) )
  }
}
