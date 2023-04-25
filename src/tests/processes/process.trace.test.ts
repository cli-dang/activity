#!/usr/bin/env node
import { trace } from '../../lib/activity/trace.js'

process.on( 'message', async id => {
  process.send( id )
  await trace( [ process.pid, id, 'testing trace_data output' ] )
  process.exit( 0 )
} )