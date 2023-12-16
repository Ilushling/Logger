# Logger
Logger

- [Usage](#usage)

## Usage
1) [(Optional) Import types](#import-types);
2) [Prepare channel](#prepare-channel);
3) [Create logger](#create-logger);
4) [Call logger](#call-logger).

### Import types
```js
/**
 * @typedef {import('logger').LoggerParams} LoggerParams
 * @typedef {import('logger').Channel} LoggerChannel
 * @typedef {import('logger').Channels} LoggerChannels
 * @typedef {import('logger').Level} LoggerLevel
 */
```

### Prepare channel
```js
/** @type {LoggerChannel} */ 
const consoleChannel = {
  trace: message => console.log(message),
  debug: message => console.debug(message),
  info: message => console.info(message),
  warn: message => console.warn(message),
  error: message => console.error(message),
  fatal: message => console.error(message)
};
```

### Create logger
```js
/** @type {LoggerChannels} */
const channels = [consoleChannel];

/** @type {LoggerLevel} */
const level = 'info';

const logger = new Logger({
  channels,

  level
});
```

### Call logger
```js
logger.info('Info message');
```
