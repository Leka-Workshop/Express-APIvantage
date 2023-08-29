import winston from 'winston';
import 'winston-mongodb';
import  DailyRotateFile from 'winston-daily-rotate-file';
import { randomBytes } from 'crypto';
import { LogIndentation } from '../shared/enums/logger/log-indentation.enum';

const { combine, timestamp, colorize, json, label, printf, metadata } =
  winston.format;

const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';
const appVersion = process.env.npm_package_version;

const generateLogId = (): string => randomBytes(16).toString('hex');

// Logger for API endpoints
export const httpLogger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        logId: generateLogId(),
        timestamp,
        appInfo: {
          appVersion,
          environment: process.env.NODE_ENV, // development/staging/production
          proccessId: process.pid,
        },
        message,
        data,
      };

      return JSON.stringify(response, null, LogIndentation.MD);
    })
  ),
  transports: [
    // log to console
    new winston.transports.Console({
      // if set to true, logs will not appear
      silent: false // or silent: process.env.NODE_ENV !== 'development'
    }),
    // log to file
    new winston.transports.File({
      filename: 'logs/application-logs.log',
    }),
    // log to file, but rotate daily
    new DailyRotateFile({
      filename: 'logs/rotating-logs-%DATE%.log', // file name includes current date
      datePattern: 'MMMM-DD-YYYY',
      zippedArchive: false, // zip logs true/false
      maxSize: '20m', // rotate if file size exceeds 20 MB
      maxFiles: '14d' // max files
    })
  ],
});


// Logger for MongoDB
export const httpLoggerDB = winston.createLogger({

  // in this case we do not need to worry about logId or Timestamp as MongoDB will generate that for us
  // the req, res data will be stored to "meta" object via metadata()
  format: combine(
    json(),
    metadata()
  ),
  transports: [
    new winston.transports.MongoDB({
      db: process.env.MONGODB_URI as string,
      collection: 'logs', // name of the table/collection where you want to store your logs
      options: { useUnifiedTopology: true }, // some stuff that CLI complains about
    }),
  ],
});

// Logger for CLI outputs
export const cliLogger = winston.createLogger({
  format: combine(
    label({ label: appVersion }),
    timestamp({ format: timestampFormat }),
    colorize({ level: true }),
    printf(
      ({ level, message, label, timestamp }) =>
        `[${timestamp}] ${level} (${label}): ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});
