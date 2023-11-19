import { Express } from 'express';
import mongooseConnect from '../databases/mongodb/mongodb';
import typeORMConnect from '../databases/postgresql/typeorm';
import { cliLoggerService } from '../services/logger/cli-logger.service';
import { InfoMessages } from '../shared/enums/messages/info-messages.enum';
import { SpecialMessages } from '../shared/enums/messages/special-messages.enum';
import { startupExceptionHandler } from '../shared/exceptions/startup-handler.exception';

const appSetup = async (app: Express) => {
  try {
    await Promise.all([typeORMConnect(), mongooseConnect()]);

    cliLoggerService.info(InfoMessages.DatabasesConnected);
    cliLoggerService.info(SpecialMessages.DottedLine);
    const PORT = Number(process.env.PORT) || 3000;

    app.listen(PORT, () => {
      cliLoggerService.info(`Server started on port ${PORT} 🚀🚀🚀`);
    });
  } catch (error: unknown) {
    startupExceptionHandler(error);
  }
};

export default appSetup;
