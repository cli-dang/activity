import { OftypesError } from 'oftypes'

export declare function exit( message: Activity.MessageArgument, error_type?: Error, exit_code?: number, process_exit?: boolean, mute?: boolean ): Promise<OftypesError | string>;
export declare function stderr( message: Activity.MessageArgument, mute?: boolean ): Promise<Buffer | string | OftypesError>;
export declare function trace( ...data: [ unknown ] ): Promise<string | OftypesError>;

export declare const trace_options: Activity.TraceOptions

declare global {
  namespace Activity {
    type TraceOptions = {
      mute: boolean,
      colors: boolean,
      depth: number,
      showHidden: boolean
    }
    type MessageArgument = string | Buffer;
  }

}
