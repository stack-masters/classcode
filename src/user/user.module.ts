import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [TypeOrmModule.forFeature([User]),AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
