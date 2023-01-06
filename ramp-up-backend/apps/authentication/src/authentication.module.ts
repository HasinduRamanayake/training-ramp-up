import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { Admin } from './Admins/admin.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './Strategies/refreshTokenStrategy';
import { AccessTokenStrategy } from './Strategies/accessTokenStrategy';
import { AdminsModule } from './Admins/admin.module';


@Module({
  imports: [
    AdminsModule,
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'user',
      database: 'Students',
      entities: [Admin],
      synchronize: true,
    }),
  
   
    
  ],

  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
