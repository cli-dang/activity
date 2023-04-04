import { OftypesError } from 'oftypes'
export declare function exit( message: MessageArgument, error_type?: Error, exit_code?: number, process_exit?: boolean, mute?: boolean ): Promise<OftypesError | string>
export declare function stderr( message: MessageArgument, mute?: boolean ): Promise<Buffer | string | OftypesError>
export declare function trace( ...data: [unknown] ): Promise< null |string | OftypesError>

export declare const trace_options: TraceOptions

declare global{
  type TraceOptions = {
    mute: boolean,
    colors: boolean,
    depth: number,
    showHidden: boolean
  }
  type MessageArgument = string | Buffer;
}