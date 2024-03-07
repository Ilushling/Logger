/**
 * @typedef {import('../ILevel.js').LoggerStringLevel} LoggerStringLevel
 * @typedef {import('../ILogger.js').LoggerMetadata} LoggerMetadata
 */

/**
 * @typedef {import('./IChannel.js').ILoggerChannel} ILoggerChannel
 * @implements {ILoggerChannel}
 */
export default class ConsoleLoggerChannel {
  /**
   * @param {Uppercase<LoggerStringLevel>} level
   * @param {any} message
   * @param {LoggerMetadata=} metadata
   */
  #buildLoggerMessage(level, message, metadata) {
    const loggerMessageParts = [];

    const handledMessage = this.#buildMessage(message);

    const dateTime = (new Date()).toISOString();

    const {
      organization,
      context,
      app,
      sourceClass,
      correlationId
    } = metadata ?? {};

    const label = (() => {
      if (organization != null && context != null && app != null) {
        return `${organization}.${context}.${app}`;
      }
    })();
    if (label != null) {
      loggerMessageParts.push(`[${label}]`);
    }

    loggerMessageParts.push(dateTime);

    if (correlationId != null) {
      loggerMessageParts.push(`(${correlationId})`);
    }

    if (level != null) {
      loggerMessageParts.push(`${level}`);
    }

    if (sourceClass != null) {
      loggerMessageParts.push(`[${sourceClass}]`);
    }

    if (handledMessage != null) {
      loggerMessageParts.push(`${handledMessage}`);
    }

    return loggerMessageParts.join(' ');
  }

  /**
   * @param {any} message
   */
  #buildMessage(message) {
    if (message == null) {
      return;
    }

    if (typeof message === 'object') {
      if (message instanceof Error) {
        return this.#buildErrorMessage(message);
      }

      return JSON.stringify(message);
    }

    return message;
  }

  /**
   * @param {Error} error
   */
  #buildErrorMessage(error) {
    let resultMessage = '';
    const delimiter = '\n';

    let currentError = error;
    while (currentError != null) {
      const name = error.name;
      const message = error.message;
  
      resultMessage += `${name}: ${message}`;
  
      const stack = error.stack;
      if (stack != null) {
        resultMessage += delimiter + stack;
      }
  
      const cause = currentError.cause;
      if (cause instanceof Error) {
        resultMessage += delimiter + 'Caused by: ';

        currentError = cause;
      }
    }

    return resultMessage;
  }

  /** @type {ILoggerChannel['trace']} */
  trace(message, metadata) {
    console.debug(this.#buildLoggerMessage('TRACE', message, metadata));
  }

  /** @type {ILoggerChannel['debug']} */
  debug(message, metadata) {
    console.debug(this.#buildLoggerMessage('DEBUG', message, metadata));
  }

  /** @type {ILoggerChannel['info']} */
  info(message, metadata) {
    console.info(this.#buildLoggerMessage('INFO', message, metadata));
  }

  /** @type {ILoggerChannel['warn']} */
  warn(message, metadata) {
    console.warn(this.#buildLoggerMessage('WARN', message, metadata));
  }

  /** @type {ILoggerChannel['error']} */
  error(message, metadata) {
    console.error(this.#buildLoggerMessage('ERROR', message, metadata));
  }

  /** @type {ILoggerChannel['fatal']} */
  fatal(message, metadata) {
    console.error(this.#buildLoggerMessage('FATAL', message, metadata));
  }
}
