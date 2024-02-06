import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable() // Provider
export class LocalAuthGuard extends AuthGuard('local') {}
