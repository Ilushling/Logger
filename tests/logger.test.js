import assert from 'node:assert';
import { describe, it } from 'node:test';

import Logger from '../src/Logger.js';
import DomainLogger from '../src/DomainLogger.js';

import LoggerFactory from '../src/LoggerFactory.js';

// import ConsoleLoggerChannel from '../src/channels/Console.js';

/**
 * @typedef {import('../src/channels/IChannel.js').ILoggerChannel} ILoggerChannel
 * @typedef {import('../src/channels/IChannel.js').LoggerChannels} LoggerChannels
 * 
 * @typedef {import('../src/ILevel.js').LoggerLevel} LoggerLevel
 * @typedef {import('../src/ILevel.js').LoggerStringLevel} LoggerStringLevel
 */

const loggerFactory = new LoggerFactory({
  Logger,
  DomainLogger
});

/**
 * @param {LoggerChannels} channels
 * @param {LoggerLevel} level
 */
function createLogger(channels, level) {
  const logger = loggerFactory.create({
    channels
  });

  logger.setup({
    level
  });

  const domainLogger = loggerFactory.createDomain({
    logger
  });

  domainLogger.setup({
    options: {
      metadata: {
        organization: 'components',
        context: 'logger',
        app: 'test',

        sourceClass: 'test'
      }
    }
  });

  return {
    logger,
    domainLogger
  };
}

/**
 * @param {Record<LoggerStringLevel, boolean>} levels
 * @returns {LoggerChannels}
 */
function createChannels(levels) {
  /** @type {ILoggerChannel} */
  const testChannel = {
    setup: () => { },

    trace: message => { levels.trace = true },
    debug: message => { levels.debug = true },
    info: message => { levels.info = true },
    warn: message => { levels.warn = true },
    error: message => { levels.error = true },
    fatal: message => { levels.fatal = true },

    getLevels: () => Object.entries(levels)
      .reduce((acc, entries) => {
        const level = /** @type {LoggerStringLevel} */ (entries[0]);
        const isEnabled = entries[1];
        if (!isEnabled) {
          return acc;
        }

        acc.push(level);

        return acc;
      }, /** @type {LoggerStringLevel[]} */ ([])),
    setLevel: () => { },
    setLevels: () => { }
  };

  return {
    // console: new ConsoleLoggerChannel(),
    test: testChannel
  };
}

// const { logger, domainLogger } = createLogger({
//   console: new ConsoleLoggerChannel()
// }, 'trace');

// logger.setChannelConfigs('console', {
//   level: 'trace'
// });

// const c3 = new Error('c3', { cause: { test: 3 } });
// const c2 = new Error('c2', { cause: { c3, test: 2 } });
// const c1 = new Error('c1', { cause: { c2, test: 1, a: { b: 1, c: 2 } } });
// const e = new Error('main', { cause: c1 });

// domainLogger.trace(e);

const correlationId = 'testId';
describe('Logger', () => {
  describe('Levels', () => {
    it('all', async () => {
      const level = 'all';
      const levels = {
        trace: false,
        debug: false,
        info: false,
        warn: false,
        error: false,
        fatal: false
      };

      const channels = createChannels(levels);
      const { domainLogger: logger } = createLogger(channels, level);

      await logger.trace('trace', { metadata: { correlationId } });
      await logger.debug('debug', { metadata: { correlationId } });
      await logger.info('info', { metadata: { correlationId } });
      await logger.warn('warn', { metadata: { correlationId } });
      await logger.error('error', { metadata: { correlationId } });
      await logger.fatal('fatal', { metadata: { correlationId } });

      assert.deepStrictEqual(levels, {
        trace: true,
        debug: true,
        info: true,
        warn: true,
        error: true,
        fatal: true
      });
    });

    it('trace', async () => {
      const level = 'trace';
      const levels = {
        trace: false,
        debug: false,
        info: false,
        warn: false,
        error: false,
        fatal: false
      };

      const channels = createChannels(levels);

      const { domainLogger: logger } = createLogger(channels, level);

      await logger.trace('trace', { metadata: { correlationId } });
      await logger.debug('debug', { metadata: { correlationId } });
      await logger.info('info', { metadata: { correlationId } });
      await logger.warn('warn', { metadata: { correlationId } });
      await logger.error('error', { metadata: { correlationId } });
      await logger.fatal('fatal', { metadata: { correlationId } });

      assert.deepStrictEqual(levels, {
        trace: true,
        debug: true,
        info: true,
        warn: true,
        error: true,
        fatal: true
      });
    });

    it('debug', async () => {
      const level = 'debug';
      const levels = {
        trace: false,
        debug: false,
        info: false,
        warn: false,
        error: false,
        fatal: false
      };

      const channels = createChannels(levels);

      const { domainLogger: logger } = createLogger(channels, level);

      await logger.trace('trace', { metadata: { correlationId } });
      await logger.debug('debug', { metadata: { correlationId } });
      await logger.info('info', { metadata: { correlationId } });
      await logger.warn('warn', { metadata: { correlationId } });
      await logger.error('error', { metadata: { correlationId } });
      await logger.fatal('fatal', { metadata: { correlationId } });

      assert.deepStrictEqual(levels, {
        trace: false,
        debug: true,
        info: true,
        warn: true,
        error: true,
        fatal: true
      });
    });

    it('info', async () => {
      const level = 'info';
      const levels = {
        trace: false,
        debug: false,
        info: false,
        warn: false,
        error: false,
        fatal: false
      };

      const channels = createChannels(levels);

      const { domainLogger: logger } = createLogger(channels, level);

      await logger.trace('trace', { metadata: { correlationId } });
      await logger.debug('debug', { metadata: { correlationId } });
      await logger.info('info', { metadata: { correlationId } });
      await logger.warn('warn', { metadata: { correlationId } });
      await logger.error('error', { metadata: { correlationId } });
      await logger.fatal('fatal', { metadata: { correlationId } });

      assert.deepStrictEqual(levels, {
        trace: false,
        debug: false,
        info: true,
        warn: true,
        error: true,
        fatal: true
      });
    });

    it('warn', async () => {
      const level = 'warn';
      const levels = {
        trace: false,
        debug: false,
        info: false,
        warn: false,
        error: false,
        fatal: false
      };

      const channels = createChannels(levels);

      const { domainLogger: logger } = createLogger(channels, level);

      await logger.trace('trace', { metadata: { correlationId } });
      await logger.debug('debug', { metadata: { correlationId } });
      await logger.info('info', { metadata: { correlationId } });
      await logger.warn('warn', { metadata: { correlationId } });
      await logger.error('error', { metadata: { correlationId } });
      await logger.fatal('fatal', { metadata: { correlationId } });

      assert.deepStrictEqual(levels, {
        trace: false,
        debug: false,
        info: false,
        warn: true,
        error: true,
        fatal: true
      });
    });

    it('error', async () => {
      const level = 'error';
      const levels = {
        trace: false,
        debug: false,
        info: false,
        warn: false,
        error: false,
        fatal: false
      };

      const channels = createChannels(levels);

      const { domainLogger: logger } = createLogger(channels, level);

      await logger.trace('trace', { metadata: { correlationId } });
      await logger.debug('debug', { metadata: { correlationId } });
      await logger.info('info', { metadata: { correlationId } });
      await logger.warn('warn', { metadata: { correlationId } });
      await logger.error('error', { metadata: { correlationId } });
      await logger.fatal('fatal', { metadata: { correlationId } });

      assert.deepStrictEqual(levels, {
        trace: false,
        debug: false,
        info: false,
        warn: false,
        error: true,
        fatal: true
      });
    });

    it('fatal', async () => {
      const level = 'fatal';
      const levels = {
        trace: false,
        debug: false,
        info: false,
        warn: false,
        error: false,
        fatal: false
      };

      const channels = createChannels(levels);

      const { domainLogger: logger } = createLogger(channels, level);

      await logger.trace('trace', { metadata: { correlationId } });
      await logger.debug('debug', { metadata: { correlationId } });
      await logger.info('info', { metadata: { correlationId } });
      await logger.warn('warn', { metadata: { correlationId } });
      await logger.error('error', { metadata: { correlationId } });
      await logger.fatal('fatal', { metadata: { correlationId } });

      assert.deepStrictEqual(levels, {
        trace: false,
        debug: false,
        info: false,
        warn: false,
        error: false,
        fatal: true
      });
    });
  });

  describe('Level', () => {
    describe('Set', () => {
      it('info', async () => {
        const level = 'fatal';
        const levels = {
          trace: false,
          debug: false,
          info: false,
          warn: false,
          error: false,
          fatal: false
        };

        const channels = createChannels(levels);

        const { logger, domainLogger } = createLogger(channels, level);

        const newLevel = 'info';
        logger.setLevel(newLevel);

        await domainLogger.trace('trace', { metadata: { correlationId } });
        await domainLogger.debug('debug', { metadata: { correlationId } });
        await domainLogger.info('info', { metadata: { correlationId } });
        await domainLogger.warn('warn', { metadata: { correlationId } });
        await domainLogger.error('error', { metadata: { correlationId } });
        await domainLogger.fatal('fatal', { metadata: { correlationId } });

        assert.deepStrictEqual(levels, {
          trace: false,
          debug: false,
          info: true,
          warn: true,
          error: true,
          fatal: true
        });
      });

      it('domain info', async () => {
        const levels = {
          trace: false,
          debug: false,
          info: false,
          warn: false,
          error: false,
          fatal: false
        };

        const channels = createChannels(levels);

        const { logger, domainLogger } = createLogger(channels, 'trace');

        domainLogger.setLevel('info');

        await domainLogger.trace('trace', { metadata: { correlationId } });
        await domainLogger.debug('debug', { metadata: { correlationId } });
        await domainLogger.info('info', { metadata: { correlationId } });
        await domainLogger.warn('warn', { metadata: { correlationId } });
        await domainLogger.error('error', { metadata: { correlationId } });
        await domainLogger.fatal('fatal', { metadata: { correlationId } });

        assert.deepStrictEqual(levels, {
          trace: false,
          debug: false,
          info: true,
          warn: true,
          error: true,
          fatal: true
        });
      });
    });
  });
});
