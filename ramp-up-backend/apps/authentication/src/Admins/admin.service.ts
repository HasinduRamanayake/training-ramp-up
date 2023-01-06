import {
  
  BadRequestException,
  ForbiddenException,
  Injectable,
  Res,

} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';
import { AddAdminDTO } from '../dto/AddAdminDTO';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async register(Admin: AddAdminDTO){

    const userExists = await this.adminRepository.findOneBy({name:Admin.name} );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.hashData(Admin.password);
    const newAdmin = this.adminRepository.create({
      name: Admin.name,
      password: hashedPassword,
      refreshToken: '',
    });

    const user = await this.adminRepository.save(newAdmin);
    console.log(user);
    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRtHash(tokens.refreshToken, user);

    return tokens;
  }

  async findOne(condition: any): Promise<Admin> {
    return this.adminRepository.findOneBy(condition);
  }

  

  async logout(id: string) {
    const user = await this.adminRepository.findOneBy({ id });
    user.refreshToken = '';
    return this.adminRepository.save(user);
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRtHash(token: string, admin: AddAdminDTO): Promise<Admin> {
    let ad: Admin = this.adminRepository.create(admin);
    ad.refreshToken = token;
    return this.adminRepository.save(ad);
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.adminRepository.findOneBy({ id: id });
    console.log(user.name);
    if (!user) throw new ForbiddenException('Access denied');
    
    if (!(refreshToken == user.refreshToken))
      throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRtHash(tokens.refreshToken, user);

    return tokens;
  }


  async getTokens(userId: string, name: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          name,
        },
        {
          secret: 'at-secret-key',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          name,
        },
        {
          secret: 'rt-secret-key',
          expiresIn: '10d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
