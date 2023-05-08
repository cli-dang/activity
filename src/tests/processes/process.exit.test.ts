#!/usr/bin/env node
import { exit } from '../../lib/activity/exit.js'

process.on( 'message', async ( id: string ): Promise<void> => {
  process.send( id )
  await exit( <string> id, undefined, 4, true, false )
} )
