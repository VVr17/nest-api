import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsMyNoticeGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { notices } = request.user;

    return notices.includes(id);
  }
}
