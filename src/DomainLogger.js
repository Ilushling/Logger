/**
 * @typedef {import('./IDomainLogger.js').DomainLoggerProperties} DomainLoggerProperties
 * @typedef {import('./IDomainLogger.js').DomainLoggerParams} DomainLoggerParams
 */

/**
 * @typedef {import('./IDomainLogger.js').LoggerMetadata} LoggerMetadata
 */

/**
 * @typedef {import('./IDomainLogger.js').IDomainLogger} IDomainLogger
 * @implements {IDomainLogger}
 */
export default class DomainLogger {
  // Dependencies
  /** @type {DomainLoggerProperties['logger']} */
  #logger;

  // Configs
  /** @type {DomainLoggerProperties['metadata']} */
  #metadata;

  /** @param {DomainLoggerParams} params */
  constructor({
    logger,

    metadata
  }) {
    this.#logger = logger;

    this.#metadata = metadata;
  }

  /**
   * @param {LoggerMetadata=} metadata
   */
  #handleMetadata(metadata) {
    return Object.assign({}, this.#metadata, metadata);
  }

  /** @type {IDomainLogger['trace']} */
  async trace(message, metadata) {
    await this.#logger.trace(message, this.#handleMetadata(metadata));
  }

  /** @type {IDomainLogger['debug']} */
  async debug(message, metadata) {
    await this.#logger.debug(message, this.#handleMetadata(metadata));
  }

  /** @type {IDomainLogger['info']} */
  async info(message, metadata) {
    await this.#logger.info(message, this.#handleMetadata(metadata));
  }

  /** @type {IDomainLogger['warn']} */
  async warn(message, metadata) {
    await this.#logger.warn(message, this.#handleMetadata(metadata));
  }

  /** @type {IDomainLogger['error']} */
  async error(message, metadata) {
    await this.#logger.error(message, this.#handleMetadata(metadata));
  }

  /** @type {IDomainLogger['fatal']} */
  async fatal(message, metadata) {
    await this.#logger.fatal(message, this.#handleMetadata(metadata));
  }
}
