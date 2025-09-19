// src/services/loggingService.ts

enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const getTimestamp = (): string => new Date().toISOString();

const log = (level: LogLevel, message: string, ...args: unknown[]) => {
  const timestamp = getTimestamp();
  const style = `font-weight: bold;`;
  let levelColor = '';

  switch (level) {
    case LogLevel.INFO:
      levelColor = 'color: #2563eb;'; // blue-600
      break;
    case LogLevel.WARN:
      levelColor = 'color: #f59e0b;'; // amber-500
      break;
    case LogLevel.ERROR:
      levelColor = 'color: #dc2626;'; // red-600
      break;
  }

  console.log(`%c[${timestamp}] [${level}]`, `${style} ${levelColor}`, message, ...args);
};

export const Logger = {
  info: (message: string, ...args: unknown[]) => log(LogLevel.INFO, message, ...args),
  warn: (message: string, ...args:unknown[]) => log(LogLevel.WARN, message, ...args),
  error: (message: string, ...args: unknown[]) => log(LogLevel.ERROR, message, ...args),
};
