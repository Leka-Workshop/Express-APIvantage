import { cliLoggerService } from '../../services/logger/cli-logger.service';
import { httpLoggerService } from '../../services/logger/http-logger.service';
import { ErrorMessages } from '../enums/messages/error-messages.enum';
import { HTTPMessages } from '../models/constants/http-messages';

export const startupExceptionHandler = (error: unknown) => {
  const err = error as Error;
  cliLoggerService.error('Server startup failed! ❌');
  httpLoggerService.error(
    {
      error: {
        name: HTTPMessages.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        message: err.message,
        stack: err.stack,
      },
    },
    ErrorMessages.AppStartupFail
  );
};
