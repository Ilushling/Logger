import assert from 'node:assert';
import { describe, it } from 'node:test';

import Logger from '../src/Logger.js';

/**
 * @typedef {import('../src/Logger.js').LoggerParams} LoggerParams
 * @typedef {import('../src/Logger.js').Channel} Channel
 * @typedef {import('../src/Logger.js').Channels} Channels
 * @typedef {import('../src/Logger.js').Level} Level
 */

/**
 * @param {Channels} channels
 * @param {Level} level
 */
function createLogger(channels, level) {
  return new Logger({
    channels,

    level
  });
}

/**
 * @param {{
 *  trace: boolean,
 *  debug: boolean,
 *  info: boolean,
 *  warn: boolean,
 *  error: boolean,
 *  fatal: boolean
 * }} levels
 * @param {Level} level
 * @returns {Channels}
 */
function createChannels(levels, level) {
  /** @type {Channel} */
  const testChannel = {
    trace: message => levels.trace = true,
    debug: message => levels.debug = true,
    info: message => levels.info = true,
    warn: message => levels.warn = true,
    error: message => levels.error = true,
    fatal: message => levels.fatal = true
  };

  return {
    testChannel: {
      channel: testChannel,
      level,
      levels: ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
    }
  };
}

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

      const channels = createChannels(levels, level);

      const logger = createLogger(channels, level);

      await logger.trace('trace');
      await logger.debug('debug');
      await logger.info('info');
      await logger.warn('warn');
      await logger.error('error');
      await logger.fatal('fatal');

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

      const channels = createChannels(levels, level);

      const logger = createLogger(channels, level);

      await logger.trace('trace');
      await logger.debug('debug');
      await logger.info('info');
      await logger.warn('warn');
      await logger.error('error');
      await logger.fatal('fatal');

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

      const channels = createChannels(levels, level);

      const logger = createLogger(channels, level);

      await logger.trace('trace');
      await logger.debug('debug');
      await logger.info('info');
      await logger.warn('warn');
      await logger.error('error');
      await logger.fatal('fatal');

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

      const channels = createChannels(levels, level);

      const logger = createLogger(channels, level);

      await logger.trace('trace');
      await logger.debug('debug');
      await logger.info('info');
      await logger.warn('warn');
      await logger.error('error');
      await logger.fatal('fatal');

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

      const channels = createChannels(levels, level);

      const logger = createLogger(channels, level);

      await logger.trace('trace');
      await logger.debug('debug');
      await logger.info('info');
      await logger.warn('warn');
      await logger.error('error');
      await logger.fatal('fatal');

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

      const channels = createChannels(levels, level);

      const logger = createLogger(channels, level);

      await logger.trace('trace');
      await logger.debug('debug');
      await logger.info('info');
      await logger.warn('warn');
      await logger.error('error');
      await logger.fatal('fatal');

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

      const channels = createChannels(levels, level);

      const logger = createLogger(channels, level);

      await logger.trace('trace');
      await logger.debug('debug');
      await logger.info('info');
      await logger.warn('warn');
      await logger.error('error');
      await logger.fatal('fatal');

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
        const levels = {
          trace: false,
          debug: false,
          info: false,
          warn: false,
          error: false,
          fatal: false
        };

        /** @type {Channel} */
        const testChannel = {
          trace: message => levels.trace = true,
          debug: message => levels.debug = true,
          info: message => levels.info = true,
          warn: message => levels.warn = true,
          error: message => levels.error = true,
          fatal: message => levels.fatal = true
        };

        /** @type {Channels} */
        const channels = {
          testChannel: {
            channel: testChannel,
            levels: ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
          }
        };

        const logger = createLogger(channels, 'all');

        logger.setLevel('info');

        await logger.trace('trace');
        await logger.debug('debug');
        await logger.info('info');
        await logger.warn('warn');
        await logger.error('error');
        await logger.fatal('fatal');

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
