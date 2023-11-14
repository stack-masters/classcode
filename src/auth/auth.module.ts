import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user.entity';
import { JwtAuthGuard } from './jwt.auth.guard';

@Module({
  imports : [JwtModule.register({
    secret : "secret",
    signOptions : {expiresIn : "30000s"}
  }),
  TypeOrmModule.forFeature([User])


],
  controllers: [AuthController],
  providers: [AuthService,JwtAuthGuard],
  exports : [JwtAuthGuard,AuthService,JwtModule]
})
export class AuthModule {}
