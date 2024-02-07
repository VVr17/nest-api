import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsMyPetGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { pets } = request.user;

    return pets.includes(id);
  }
}
