// Sistema profissional de tratamento de erros

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} não encontrado`, 'NOT_FOUND', 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Não autorizado') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 'DATABASE_ERROR', 500);
  }
}

// Logger profissional
export const logger = {
  error: (error: Error | AppError, context?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Error:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString()
      });
    }
    // Em produção, enviar para serviço de monitoramento (Sentry, etc)
  },
  
  warn: (message: string, context?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Warning:', { message, context, timestamp: new Date().toISOString() });
    }
  },
  
  info: (message: string, context?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      console.info('ℹ️ Info:', { message, context, timestamp: new Date().toISOString() });
    }
  }
};

// Handler global de erros
export function handleError(error: unknown): { message: string; code: string } {
  if (error instanceof AppError) {
    logger.error(error);
    return {
      message: error.message,
      code: error.code
    };
  }
  
  if (error instanceof Error) {
    logger.error(error);
    return {
      message: 'Ocorreu um erro inesperado',
      code: 'INTERNAL_ERROR'
    };
  }
  
  logger.error(new Error('Unknown error'), { error });
  return {
    message: 'Erro desconhecido',
    code: 'UNKNOWN_ERROR'
  };
}
