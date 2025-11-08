export abstract class AppError extends Error {
  abstract statusCode: number;
  abstract code: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AppDatabaseError extends AppError {
  statusCode: number = 500;
  code: string = "DATABASE_ERROR";

  constructor(message: string) {
    super(message);
  }
}

export class BusinessValidationError extends AppError {
  statusCode = 400;
  code = "VALIDATION_ERROR";

  constructor(
    message: string,
    public fields?: Record<string, string>,
  ) {
    super(message);
  }
}
