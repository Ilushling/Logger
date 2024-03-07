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
 * @typedef {import('../src/ILevel.js').Level} Level
 * @typedef {import('../src/ILevel.js').StringLevel} StringLevel
 */

const loggerFactory = new LoggerFactory({
  Logger,
  DomainLogger
});

/**
 * @param {LoggerChannels} channels
 * @param {Level} level
 */
function createLogger(channels, level) {
  const logger = loggerFactory.create({
    channels
  });

  logger.setup({
    configs: {
      level,
      channels: {
        console: {
          level
        },
        test: {
          level
        }
      }
    }
  });

  const domainLogger = loggerFactory.createDomain({
    logger,
    metadata: {
      organization: 'components',
      context: 'logger',
      app: 'test',
      sourceClass: 'test'
    }
  });

  return {
    logger,
    domainLogger
  };
}

/**
 * @param {Record<StringLevel, boolean>} levels
 * @returns {LoggerChannels}
 */
function createChannels(levels) {
  /** @type {ILoggerChannel} */
  const testChannel = {
    trace: message => levels.trace = true,
    debug: message => levels.debug = true,
    info: message => levels.info = true,
    warn: message => levels.warn = true,
    error: message => levels.error = true,
    fatal: message => levels.fatal = true
  };

  return {
    // console: new ConsoleLoggerChannel(),
    test: testChannel
  };
}

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

      await logger.trace('trace', { correlationId });
      await logger.debug('debug', { correlationId });
      await logger.info('info', { correlationId });
      await logger.warn('warn', { correlationId });
      await logger.error('error', { correlationId });
      await logger.fatal('fatal', { correlationId });

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

      await logger.trace('trace', { correlationId });
      await logger.debug('debug', { correlationId });
      await logger.info('info', { correlationId });
      await logger.warn('warn', { correlationId });
      await logger.error('error', { correlationId });
      await logger.fatal('fatal', { correlationId });

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

      await logger.trace('trace', { correlationId });
      await logger.debug('debug', { correlationId });
      await logger.info('info', { correlationId });
      await logger.warn('warn', { correlationId });
      await logger.error('error', { correlationId });
      await logger.fatal('fatal', { correlationId });

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

      await logger.trace('trace', { correlationId });
      await logger.debug('debug', { correlationId });
      await logger.info('info', { correlationId });
      await logger.warn('warn', { correlationId });
      await logger.error('error', { correlationId });
      await logger.fatal('fatal', { correlationId });

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

      await logger.trace('trace', { correlationId });
      await logger.debug('debug', { correlationId });
      await logger.info('info', { correlationId });
      await logger.warn('warn', { correlationId });
      await logger.error('error', { correlationId });
      await logger.fatal('fatal', { correlationId });

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

      await logger.trace('trace', { correlationId });
      await logger.debug('debug', { correlationId });
      await logger.info('info', { correlationId });
      await logger.warn('warn', { correlationId });
      await logger.error('error', { correlationId });
      await logger.fatal('fatal', { correlationId });

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

      await logger.trace('trace', { correlationId });
      await logger.debug('debug', { correlationId });
      await logger.info('info', { correlationId });
      await logger.warn('warn', { correlationId });
      await logger.error('error', { correlationId });
      await logger.fatal('fatal', { correlationId });

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

        /** @type {ILoggerChannel} */
        const testChannel = {
          trace: message => levels.trace = true,
          debug: message => levels.debug = true,
          info: message => levels.info = true,
          warn: message => levels.warn = true,
          error: message => levels.error = true,
          fatal: message => levels.fatal = true
        };

        /** @type {LoggerChannels} */
        const channels = {
          test: testChannel
        };

        const { logger, domainLogger } = createLogger(channels, level);

        const newLevel = 'info';
        logger.setLevel(newLevel);
        logger.setChannelConfigs('test', {
          level: newLevel
        });

        await domainLogger.trace('trace', { correlationId });
        await domainLogger.debug('debug', { correlationId });
        await domainLogger.info('info', { correlationId });
        await domainLogger.warn('warn', { correlationId });
        await domainLogger.error('error', { correlationId });
        await domainLogger.fatal('fatal', { correlationId });

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
