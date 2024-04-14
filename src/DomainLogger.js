/**
 * @implements {IDomainLogger}
 */
export default class DomainLogger {
  /**
   * @typedef {import('./IDomainLogger.js').DomainLoggerProperties} DomainLoggerProperties
   * @typedef {import('./IDomainLogger.js').DomainLoggerParams} DomainLoggerParams
   */

  /**
   * @typedef {import('./IDomainLogger.js').LoggerOptions} LoggerOptions
   */

  /**
   * @typedef {import('./IDomainLogger.js').IDomainLogger} IDomainLogger
   */

  // Dependencies
  /** @type {DomainLoggerProperties['logger']} */
  #logger;

  // Configs
  /** @type {DomainLoggerProperties['configs']} */
  #configs;

  /** @param {DomainLoggerParams} params */
  constructor({
    logger
  }) {
    this.#logger = logger;
  }

  /** @type {IDomainLogger['setup']} */
  setup({ configs }) {
    this.#configs = configs;
  }

  /**
   * @param {LoggerOptions=} options
   */
  #handleOptions(options) {
    const currentOptions = this.#configs?.options;

    if (options == null) {
      return currentOptions;
    }

    const newOptions = Object.assign({}, currentOptions, options);

    if (newOptions.metadata != null) {
      newOptions.metadata = Object.assign({}, currentOptions?.metadata, options.metadata);
    }

    return newOptions;
  }

  /** @type {IDomainLogger['trace']} */
  async trace(message, options) {
    await this.#logger.trace(message, this.#handleOptions(options));
  }

  /** @type {IDomainLogger['debug']} */
  async debug(message, options) {
    await this.#logger.debug(message, this.#handleOptions(options));
  }

  /** @type {IDomainLogger['info']} */
  async info(message, options) {
    await this.#logger.info(message, this.#handleOptions(options));
  }

  /** @type {IDomainLogger['warn']} */
  async warn(message, options) {
    await this.#logger.warn(message, this.#handleOptions(options));
  }

  /** @type {IDomainLogger['error']} */
  async error(message, options) {
    await this.#logger.error(message, this.#handleOptions(options));
  }

  /** @type {IDomainLogger['fatal']} */
  async fatal(message, options) {
    await this.#logger.fatal(message, this.#handleOptions(options));
  }
}
