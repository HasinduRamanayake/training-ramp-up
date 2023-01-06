import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './Admins/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from './Admins/admin.service';

@Injectable()
export class AuthenticationService {
  constructor(
  
  ) {}

  
}
