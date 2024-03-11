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
    logger
  });

  domainLogger.setup({
    configs: {
      options: {
    metadata: {
      organization: 'components',
      context: 'logger',
          app: 'test'
        }
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

      await logger.trace('trace', { metadata: { sourceClass: 'test', correlationId } });
      await logger.debug('debug', { metadata: { sourceClass: 'test', correlationId } });
      await logger.info('info', { metadata: { sourceClass: 'test', correlationId } });
      await logger.warn('warn', { metadata: { sourceClass: 'test', correlationId } });
      await logger.error('error', { metadata: { sourceClass: 'test', correlationId } });
      await logger.fatal('fatal', { metadata: { sourceClass: 'test', correlationId } });

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

      await logger.trace('trace', { metadata: { sourceClass: 'test', correlationId } });
      await logger.debug('debug', { metadata: { sourceClass: 'test', correlationId } });
      await logger.info('info', { metadata: { sourceClass: 'test', correlationId } });
      await logger.warn('warn', { metadata: { sourceClass: 'test', correlationId } });
      await logger.error('error', { metadata: { sourceClass: 'test', correlationId } });
      await logger.fatal('fatal', { metadata: { sourceClass: 'test', correlationId } });

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

      await logger.trace('trace', { metadata: { sourceClass: 'test', correlationId } });
      await logger.debug('debug', { metadata: { sourceClass: 'test', correlationId } });
      await logger.info('info', { metadata: { sourceClass: 'test', correlationId } });
      await logger.warn('warn', { metadata: { sourceClass: 'test', correlationId } });
      await logger.error('error', { metadata: { sourceClass: 'test', correlationId } });
      await logger.fatal('fatal', { metadata: { sourceClass: 'test', correlationId } });

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

      await logger.trace('trace', { metadata: { sourceClass: 'test', correlationId } });
      await logger.debug('debug', { metadata: { sourceClass: 'test', correlationId } });
      await logger.info('info', { metadata: { sourceClass: 'test', correlationId } });
      await logger.warn('warn', { metadata: { sourceClass: 'test', correlationId } });
      await logger.error('error', { metadata: { sourceClass: 'test', correlationId } });
      await logger.fatal('fatal', { metadata: { sourceClass: 'test', correlationId } });

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

      await logger.trace('trace', { metadata: { sourceClass: 'test', correlationId } });
      await logger.debug('debug', { metadata: { sourceClass: 'test', correlationId } });
      await logger.info('info', { metadata: { sourceClass: 'test', correlationId } });
      await logger.warn('warn', { metadata: { sourceClass: 'test', correlationId } });
      await logger.error('error', { metadata: { sourceClass: 'test', correlationId } });
      await logger.fatal('fatal', { metadata: { sourceClass: 'test', correlationId } });

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

      await logger.trace('trace', { metadata: { sourceClass: 'test', correlationId } });
      await logger.debug('debug', { metadata: { sourceClass: 'test', correlationId } });
      await logger.info('info', { metadata: { sourceClass: 'test', correlationId } });
      await logger.warn('warn', { metadata: { sourceClass: 'test', correlationId } });
      await logger.error('error', { metadata: { sourceClass: 'test', correlationId } });
      await logger.fatal('fatal', { metadata: { sourceClass: 'test', correlationId } });

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

      await logger.trace('trace', { metadata: { sourceClass: 'test', correlationId } });
      await logger.debug('debug', { metadata: { sourceClass: 'test', correlationId } });
      await logger.info('info', { metadata: { sourceClass: 'test', correlationId } });
      await logger.warn('warn', { metadata: { sourceClass: 'test', correlationId } });
      await logger.error('error', { metadata: { sourceClass: 'test', correlationId } });
      await logger.fatal('fatal', { metadata: { sourceClass: 'test', correlationId } });

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

        await domainLogger.trace('trace', { metadata: { sourceClass: 'test', correlationId } });
        await domainLogger.debug('debug', { metadata: { sourceClass: 'test', correlationId } });
        await domainLogger.info('info', { metadata: { sourceClass: 'test', correlationId } });
        await domainLogger.warn('warn', { metadata: { sourceClass: 'test', correlationId } });
        await domainLogger.error('error', { metadata: { sourceClass: 'test', correlationId } });
        await domainLogger.fatal('fatal', { metadata: { sourceClass: 'test', correlationId } });

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
