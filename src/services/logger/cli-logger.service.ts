import { ICLILoggerService } from './interface/ilogger.service';
import { cliLogger } from './setup/winston-logger.setup';

/**
 * Logger used for logging into CLI
 */
class CLILoggerService implements ICLILoggerService {
  info(message: string) {
    return cliLogger.info(message);
  }

  warn(message: string) {
    return cliLogger.warn(message);
  }

  error(message: string) {
    return cliLogger.error(message);
  }
}

export const cliLoggerService = new CLILoggerService();
