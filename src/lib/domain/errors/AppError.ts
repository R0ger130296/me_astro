/**
 * Base Application Error
 * Domain Layer - Error handling
 */
export abstract class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not Found Error
 */
export class NotFoundError extends AppError {
  constructor(resource: string, id?: string | number) {
    super(
      id ? `${resource} with id ${id} not found` : `${resource} not found`,
      'NOT_FOUND',
      404
    );
  }
}

/**
 * Validation Error
 */
export class ValidationError extends AppError {
  constructor(message: string, public readonly fields?: Record<string, string[]>) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

/**
 * Repository Error
 */
export class RepositoryError extends AppError {
  constructor(message: string, cause?: Error) {
    super(message, 'REPOSITORY_ERROR', 500, cause);
  }
}

