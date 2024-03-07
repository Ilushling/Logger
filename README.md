# Logger
Logger

- [Usage](#usage).

## Usage
1) [Prepare](#prepare);
2) [Commands](#commands).

### Prepare
1) [(Optional) Import types](#import-types);
2) [Prepare channel](#prepare-channel);
3) [Create logger](#create-logger);
4) [Setup logger](#create-logger).

#### Import types
```js
/**
 * @typedef {import('mainlog').Channel} LoggerChannel
 * @typedef {import('mainlog').Channels} LoggerChannels
 * @typedef {import('mainlog').Level} LoggerLevel
 */
```

#### Prepare channel
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

#### Create logger
```js
/** @type {LoggerLevel} */
const level = 'trace';
const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

/** @type {LoggerChannels} */
const channels = {
  console: container.get('consoleLoggerChannel'),
  console2: container.get('console2LoggerChannel')
};

const logger = new Logger({
  channels
});

const domainLogger = new DomainLogger({
  logger,
  metadata: {
    organization: 'Organization',
    context: 'Context',
    app: 'App',
    sourceClass: 'Class'
  }
});
```

or

```js
const loggerFactory = new LoggerFactory({
  Logger,
  DomainLogger
});

const logger = loggerFactory.create({
  channels
});

const domainLogger = loggerFactory.createDomain({
  logger,
  metadata: {
    organization: 'Organization',
    context: 'Context',
    app: 'App',
    sourceClass: 'Class'
  }
});
```

#### Setup logger
```js
logger.setup({
  configs: {
    level,
    channels: {
      console: {
        level
      },
      console2: {
        levels
      }
    }
  }
});
```

or

```js
logger.setLevels(levels);
logger.setChannelsConfigs({
  channel: {
    level
  },
  channel2: {
    levels
  }
});
```

or

```js
logger.setLevel(level);
logger.setChannelConfigs('console', {
  level
});
logger.setChannelConfigs('console2', {
  levels
});
```

### Commands
1) [Call logger](#call-logger).

#### Call logger
```js
logger.trace('Trace message');
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warn message');
logger.error('Error message');
logger.fatal('Fatal message');
```

or

```js
const correlationId = 'requestId';

domainLogger.trace('Trace message', { correlationId });
domainLogger.debug('Debug message', { correlationId });
domainLogger.info('Info message', { correlationId });
domainLogger.warn('Warn message', { correlationId });
domainLogger.error('Error message', { correlationId });
domainLogger.fatal('Fatal message', { correlationId });
```
