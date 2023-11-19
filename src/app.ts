import express from 'express';
const app = express();
import dotenv from 'dotenv';
// Set up environment variables before loading the rest of the app
dotenv.config();

import appSetup from './startup/init';
import routerSetup from './startup/router';
import securitySetup from './startup/security';
import { NodeProcessEvents } from './shared/enums/events/node-process-events.enum';

process.on(NodeProcessEvents.UncaughtException, (error: any) => {
  console.log('uncaught exception')
  console.error(error);
  process.exit(1);
});

process.on(NodeProcessEvents.UnhandledRejection, (error: any) => {
  console.log('unhandled rejection')
  console.error(error);
  process.exit(1);
});

void appSetup(app);
securitySetup(app, express);
routerSetup(app);
