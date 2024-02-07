import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Local Auth Guard Provider
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
