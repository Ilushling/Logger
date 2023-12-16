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

describe('Logger', () => {
  describe('Levels', () => {
    it('all', async () => {
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

      const channels = [
        testChannel
      ];

      const logger = createLogger(channels, 'all');

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

      const channels = [
        testChannel
      ];

      const logger = createLogger(channels, 'trace');

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

      const channels = [
        testChannel
      ];

      const logger = createLogger(channels, 'debug');

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

      const channels = [
        testChannel
      ];

      const logger = createLogger(channels, 'info');

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

      const channels = [
        testChannel
      ];

      const logger = createLogger(channels, 'warn');

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

      const channels = [
        testChannel
      ];

      const logger = createLogger(channels, 'error');

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

      const channels = [
        testChannel
      ];

      const logger = createLogger(channels, 'fatal');

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

        const channels = [
          testChannel
        ];

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
