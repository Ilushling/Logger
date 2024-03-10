# Logger
Logger with channels & domain metadata decorator

1) [Usage](#usage):
  1) [Prepare](#prepare):
      1) [Import types](#import-types);
      2) [Prepare channel](#prepare-channel);
      3) [Create logger](#create-logger);
      4) [Setup logger](#setup-logger).
  2) [Commands](#commands):
      1) [Call logger](#call-logger).

## Usage
### Prepare
#### Import types
Optional

```js
/**
 * @typedef {import('mainlog').ILoggerChannel} ILoggerChannel
 * @typedef {import('mainlog').LoggerChannels} LoggerChannels
 * @typedef {import('mainlog').LoggerLevel} LoggerLevel
 * @typedef {import('mainlog').LoggerStringLevel} LoggerStringLevel
 */
```

#### Prepare channel
```js
import { Logger, DomainLogger, ConsoleLoggerChannel } from 'mainlog';

/** @type {ILoggerChannel} */ 
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
/** @type {LoggerChannels} */
const channels = {
  console: consoleChannel,
  console2: new ConsoleLoggerChannel()
};

const logger = new Logger({
  channels
});

const domainLogger = new DomainLogger({
  logger
});
```

or

```js
import { Logger, DomainLogger, LoggerFactory } from 'mainlog';

const loggerFactory = new LoggerFactory({
  Logger,
  DomainLogger
});

const logger = loggerFactory.create({
  channels
});

const domainLogger = loggerFactory.createDomain({
  logger
});
```

#### Setup logger
```js
/** @type {LoggerLevel} */
const level = 'trace';
/** @type {LoggerStringLevel} */
const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

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

domainLogger.setup({
  configs: {
    metadata: {
      organization: 'Organization',
      context: 'Context',
      app: 'App'
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
