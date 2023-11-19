import { HTTPMethods } from '../../shared/enums/http/http-methods.enum';
import formatHTTPLoggerResponse from './utils/format-http-logger-response.utils';
import { IHTTPLogMetaData } from './interface/http-logger-response.interface';
import { httpLoggerDB } from './setup/winston-logger.setup';
import { IHTTPLoggerService } from './interface/ilogger.service';
import { getSuccessfulHTTPResponseMessage } from './utils/logger-messages.utils';

/**
 * Logger used for logging into MongoDB
 */
class DBLoggerService implements IHTTPLoggerService {

  info(context: IHTTPLogMetaData, message = '') {
    return httpLoggerDB.info(
      message || getSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

  warn(context: IHTTPLogMetaData, message = '') {
    return httpLoggerDB.warn(
      message || getSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

  error(context: IHTTPLogMetaData, message = '') {
    return httpLoggerDB.error(
      message || getSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

}

export const dbLoggerService = new DBLoggerService();
