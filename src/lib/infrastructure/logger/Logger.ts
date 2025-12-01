/**
 * Logger Service
 * Infrastructure Layer - Logging
 * Implements Strategy Pattern for different log levels
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export interface ILogger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, error?: Error, ...args: unknown[]): void;
}

/**
 * Console Logger Implementation
 */
export class ConsoleLogger implements ILogger {
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  debug(message: string, ...args: unknown[]): void {
    if (import.meta.env.DEV) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message), ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    console.info(this.formatMessage(LogLevel.INFO, message), ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(this.formatMessage(LogLevel.WARN, message), ...args);
  }

  error(message: string, error?: Error, ...args: unknown[]): void {
    console.error(this.formatMessage(LogLevel.ERROR, message), error, ...args);
  }
}

/**
 * Logger Factory
 */
export class LoggerFactory {
  private static logger: ILogger | null = null;

  static getLogger(): ILogger {
    if (!LoggerFactory.logger) {
      LoggerFactory.logger = new ConsoleLogger();
    }
    return LoggerFactory.logger;
  }

  static setLogger(logger: ILogger): void {
    LoggerFactory.logger = logger;
  }
}

