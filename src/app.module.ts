import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { JoinModule } from './join/join.module';
import { HomeworkModule } from './homework/homework.module';
import { SubmitModule } from './submit/submit.module';

@Module({
  imports: [AuthModule,UserModule,
  TypeOrmModule.forRootAsync({useFactory : ormConfig}),
  RoomModule,
  JoinModule,
  HomeworkModule,
  SubmitModule],
})
export class AppModule {}
