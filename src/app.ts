import express from 'express';
const app = express();
import dotenv from 'dotenv';
import appSetup from './startup/init';
import routerSetup from './startup/router';
import securitySetup from './startup/security';
dotenv.config();

void appSetup(app);
securitySetup(app, express);
routerSetup(app);
