import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request, Response } from 'express';
import { AddAdminDTO } from '../dto/AddAdminDTO';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async register(@Body() dto: AddAdminDTO) {
    console.log(dto);
    return this.adminService.register(dto);
  }

  @Post('login')
  async login(
    @Body('name') name: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.adminService.findOne({ name });
    console.log(user);

    if (!user) {
      throw new BadRequestException('User not exists');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }
    const tokens = await this.adminService.getTokens(user.id, user.name);

    await this.adminService.updateRtHash(tokens.refreshToken, user);
    console.log(typeof tokens.refreshToken);
    response.cookie('jwt-cookie', tokens.refreshToken, { httpOnly: true });

    return tokens;
  }

  @Get('user')
  async user(@Req() request: Request) {
    // try {
    const cookie = request.cookies['jwt-cookie'];
    console.log(typeof cookie);
    // const data = await this.jwtService.verifyAsync(cookie);
    // console.log(data)

    if (!cookie) {
      throw new UnauthorizedException();
    }

    const user = await this.adminService.findOne({ id: cookie['id'] });

    const { password, ...result } = user;
    return result;

    // } catch (e) {
    //   throw new UnauthorizedException();
    // }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logOut(@Req() req: Request) {
    const user = req.user;
    return this.adminService.logout(user['id']);
  }
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const user = req.user;
    return this.adminService.refreshTokens(user['id'], user['refreshToken']);
  }
}
