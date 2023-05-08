import { oftype_ } from 'oftypes'

export async function stderr_exit_text( data: unknown, module: string, argument: string ): Promise<string> {
  return `♠ activity.${ module } error - <oftype>${ await oftype_( data ) }</oftype> not allowed for <argument>${ argument }</argument>`
}

export async function stderr_trace_text( data: unknown, module: string ): Promise<string> {
  return `♠ activity.${ module } error - <oftype>${ await oftype_( data ) }</oftype> not allowed for <argument>mute</argument>`
}
