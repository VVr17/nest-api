import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { mongoConflictError, mongoValidationError } from 'src/utils/constants';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        // Check if it's a custom error
        if (err.status) {
          return throwError(() => err);
        }

        // Check if it's a Mongoose validation error
        if (err.name === mongoValidationError) {
          const validationErrors = {};
          for (const key in err.errors) {
            if (err.errors.hasOwnProperty(key)) {
              validationErrors[key] = err.errors[key].message;
            }
          }

          return throwError(
            () =>
              new BadRequestException({
                message: 'Validation error',
                errors: validationErrors,
              }),
          );
        }

        // If it is MongoDb duplicate key error for unique indexes
        if (err.code === mongoConflictError) {
          const field = Object.keys(err.keyValue)[0];

          return throwError(
            () =>
              new ConflictException({
                message: `Field ${field}: ${err.keyValue[field]} already exists.`,
                description: 'Duplicate key error',
                status: 409,
              }),
          );
        }
        console.log('error', err);
        return throwError(() => new InternalServerErrorException());
      }),
    );
  }
}
