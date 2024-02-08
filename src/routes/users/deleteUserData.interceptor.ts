import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NoticesService } from '../notices/notices.service';
import { PetsService } from '../pets/pets.service';

// Removes all user's pets and notices before delete user's account
@Injectable()
export class DeleteUserDataInterceptor implements NestInterceptor {
  constructor(
    private readonly petsService: PetsService,
    private readonly noticeService: NoticesService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { pets, notices } = req.user;

    return next.handle().pipe(
      tap(async () => {
        // Delete user's pets
        if (!!pets.length) {
          await this.petsService.removeMany(pets);
        }
        // Delete user's notices
        if (!!notices.length) {
          await this.noticeService.removeMany(notices);
        }
      }),
    );
  }
}
