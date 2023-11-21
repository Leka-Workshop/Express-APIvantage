import express from 'express';
const app = express();
import dotenv from 'dotenv';
// Set up environment variables before loading the rest of the app
dotenv.config();

import appSetup from './startup/init';
import routerSetup from './startup/router';
import securitySetup from './startup/security';

import { NodeProcessEvents } from './shared/enums/events/node-process-events.enum';
import { exceptionLogWrapper } from './shared/helpers/exception-log-wrapper.helper';
import { ErrorMessages } from './shared/enums/messages/error-messages.enum';

process.on(NodeProcessEvents.UncaughtException, (error: unknown) => {
  exceptionLogWrapper(error, ErrorMessages.UncaughtException);
  process.exit(1);
});

process.on(NodeProcessEvents.UnhandledRejection, (error: unknown) => {
  exceptionLogWrapper(error, ErrorMessages.UnhandledRejection);
  process.exit(1);
});

void appSetup(app);
securitySetup(app, express);
routerSetup(app);
