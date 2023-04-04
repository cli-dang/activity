# @cli-dang/activity

___

###### Module activity wraps and extends [ process.exit, process.stderr.write, console.trace&node:util/inspect ]

___

## Index of Contents

___

- [Description](#description)
- [Installation](#installation)
- [@cli-dang/activity API](#cli-dangactivity-api)
  - [.trace](#tracedata)
  - [.trace_options](#traceoptions--mute-boolean-colors-boolean-depth-number-showhidden-boolean-)
  - [.exit](#exitmessage-errortype-exitcode-processexit-mute)
  - [.stderr](#stderrmessage-mute)
- [JetBrains OSS Licence](#jetbrains-oss-license)

___

## Description

___

**_@cli-dang/activity_** is a module wrapper for:

- `process.stderr.write()`
- `process.exit()`
- `console.trace()`

It gives these methods new functionalities.  
Basically, its main usage is to print on the console, errors,
inspect variables and exit the process.

___

## Installation

___

```shell
npm install @cli-dang/activity
```

___

## @cli-dang/activity API

___

### .trace(...data)

```javascript
import { trace } from '@cli-dang/activity'

await trace([data, {...'string'}])
```

### .trace_options { mute?: boolean, colors?: boolean, depth: number, showHidden: boolean  }


> api for node:util/inspect options

```javascript
import { trace_options, trace } from '@cli-dang/activity'
/* we shut down console.trace and we return a node:util.inspect Object */

trace_options.mute = true
console.log(await trace([data, {...'string'}]))
```

___

### .exit(message, [error_type], [exit_code], [process_exit], [mute])

```javascript
import { exit } from '@cli-dang/activity'

await exit('process will now exit').catch(error=>console.error(error))
// prints to stderr the message and Error.staktrace and exit the process with code 1
```

___

### .stderr(message, [mute])

```javascript
import { stderr } from '@cli-dang/activity'

await stderr('process had errors').catch(error=>console.error(error))
// prints to stderr the message
```

___

## JetBrains OSS License

___

I want to thank JetBrains to grant me the Open Source Software license for all their products. This opportunity gives me
strength to keep on going with my studies and personal project.  
To learn more about this opportunity, have a look
at [Licenses for Open Source Development - Community Support](https://www.jetbrains.com/community/opensource/).

_Thank you_