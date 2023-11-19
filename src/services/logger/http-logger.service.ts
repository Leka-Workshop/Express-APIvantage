import { HTTPMethods } from '../../shared/enums/http/http-methods.enum';
import formatHTTPLoggerResponse from './utils/format-http-logger-response.utils';
import { IHTTPLogMetaData } from './interface/http-logger-response.interface';
import { httpLogger } from './setup/winston-logger.setup';
import { IHTTPLoggerService } from './interface/ilogger.service';
import { getSuccessfulHTTPResponseMessage, getUnSuccessfulHTTPResponseMessage } from './utils/logger-messages.utils';

/**
 * Logger used for logging into files & CLI
 */
class HTTPLoggerService implements IHTTPLoggerService {

  info(context: IHTTPLogMetaData, message = '') {
    return httpLogger.info(
      message || getSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

  warn(context: IHTTPLogMetaData, message = '') {
    return httpLogger.warn(
      message || getUnSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

  error(context: IHTTPLogMetaData, message = '') {
    return httpLogger.error(
      message || getUnSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

}

export const httpLoggerService = new HTTPLoggerService();
