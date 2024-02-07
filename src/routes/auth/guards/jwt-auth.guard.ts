import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// JWT Auth Guard Provider
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
