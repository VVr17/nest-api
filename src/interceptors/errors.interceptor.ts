import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { mongoValidationError } from 'src/utils/constants';

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

        return throwError(() => new InternalServerErrorException());
      }),
    );
  }
}
