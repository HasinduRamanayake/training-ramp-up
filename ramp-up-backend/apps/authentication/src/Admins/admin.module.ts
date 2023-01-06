import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenStrategy } from '../Strategies/refreshTokenStrategy';
import { AccessTokenStrategy } from '../Strategies/accessTokenStrategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: 'SecretKey',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, RefreshTokenStrategy, AccessTokenStrategy],
})
export class AdminsModule {}
