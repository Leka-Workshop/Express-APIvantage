import { Express } from 'express';
import mongooseConnect from '../databases/mongodb/mongodb';
import typeORMConnect from '../databases/postgresql/typeorm';
import { httpLogger, cliLogger } from '../services/logger.service';
import { ErrorMessages } from '../shared/enums/messages/error-messages.enum';
import { InfoMessages } from '../shared/enums/messages/info-messages.enum';
import { SpecialMessages } from '../shared/enums/messages/special-messages.enum';

const appSetup = async (app: Express) => {

  try {
    await Promise.all([
      typeORMConnect(),
      mongooseConnect(),
    ]);

    cliLogger.info(InfoMessages.DatabasesConnected);
    cliLogger.info(SpecialMessages.DottedLine);
    const PORT = Number(process.env.PORT) || 3000;

    app.listen(PORT, () => {
      cliLogger.info(`Server started on port ${PORT} 🚀🚀🚀`);
    });

  } catch (error: unknown) {
    cliLogger.error('Server startup failed! ❌');
    httpLogger.error(ErrorMessages.AppStartupFail, { error });
  }
};

export default appSetup;
