import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import {JwtService} from "@nestjs/jwt"
import { Response } from 'express';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  
 
}
