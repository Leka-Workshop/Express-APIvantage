import cors from 'cors';
import { Express } from 'express';

const securitySetup = (app: Express, express: any) =>
  app
  .use(cors())
  .use(express.json())

export default securitySetup;
