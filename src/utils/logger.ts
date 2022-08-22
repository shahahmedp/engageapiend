import { createLogger, format, transports } from 'winston';
import options from '../config/logConfig.json';

export const logger=createLogger({
        transports: [
            new transports.File(options.file),
            new transports.Console(options.console),
          ],
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
          format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
          })
        ),  
      });