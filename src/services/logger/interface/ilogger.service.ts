import { Logger } from 'winston';
import { IHTTPLogMetaData } from './http-logger-response.interface';

interface ILoggerService {
  info(context: any, message?: string): Logger;
  warn(context: any, message?: string): Logger;
  error(context: any, message?: string): Logger;
}

export interface IHTTPLoggerService extends ILoggerService {
  /**
   * Creates Info log using Winston
   * @param {IHTTPLogMetaData} context - Holds current request & response info
   * @param {string} message - Optional message
   * @returns {Logger} Returns WInston Logger
   */
  info(context: IHTTPLogMetaData, message: string): Logger;

  /**
   * Creates Warning log using Winston
   * @param {IHTTPLogMetaData} context - Holds current request & response info
   * @param {string} message - Optional message
   * @returns {Logger} Returns Winston Logger
   */
  warn(context: IHTTPLogMetaData, message: string): Logger;

  /**
   * Creates Error log using Winston
   * @param {IHTTPLogMetaData} context - Holds current request & response info
   * @param {string} message - Optional message
   * @returns {Logger} Returns Winston Logger
   */
  error(context: IHTTPLogMetaData, message: string): Logger;
}

export interface ICLILoggerService extends ILoggerService {
  /**
   * Creates Info log using Winston
   * @param {string} message - CLI message
   * @returns {Logger} Returns WInston Logger
   */
  info(message: string): Logger;

  /**
   * Creates Warning log using Winston
   * @param {string} message - CLI message
   * @returns {Logger} Returns WInston Logger
   */
  warn(message: string): Logger;

  /**
   * Creates Error log using Winston
   * @param {string} message - CLI message
   * @returns {Logger} Returns WInston Logger
   */
  error(message: string): Logger;
}
