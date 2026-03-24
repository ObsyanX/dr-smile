/**
 * Basic Frontend Logger
 * 
 * In a production environment with zero-cost/low-budget requirements,
 * we utilize the console for standard logging, but format it for easier 
 * grep/search if ingested by Vercel Logs or a similar free-tier log drain.
 * 
 * Future enhancement: Send critical errors to a free discord/slack webhook
 * or a free tier of Sentry/LogRocket.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] [DrSmileApp] ${message}${contextStr}`;
  }

  info(message: string, context?: LogContext) {
    console.info(this.formatMessage('info', message, context));
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.formatMessage('warn', message, context));
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? `\nStack: ${error.stack}` : '';
    console.error(this.formatMessage('error', `${message} - ${errorMsg}${errorStack}`, context));
  }

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage('debug', message, context));
    }
  }
}

export const logger = new Logger();
