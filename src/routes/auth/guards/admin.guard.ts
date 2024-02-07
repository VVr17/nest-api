import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// Admin Guard - checks whether user is admin
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    return user && user.isAdmin;
  }
}
