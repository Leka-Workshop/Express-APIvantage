import express from 'express';
const app = express();
import dotenv from 'dotenv';
// Set up environment variables before loading the rest of the app
dotenv.config();

import appSetup from './startup/init';
import routerSetup from './startup/router';
import securitySetup from './startup/security';

void appSetup(app);
securitySetup(app, express);
routerSetup(app);
