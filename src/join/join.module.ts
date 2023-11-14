import { Module } from '@nestjs/common';
import { JoinService } from './join.service';
import { JoinController } from './join.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Join } from 'src/domain/join.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Room } from 'src/domain/room.entity';
import { User } from 'src/domain/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Join,Room,User]),
  AuthModule ],
  controllers: [JoinController],
  providers: [JoinService],
  exports : [JoinService]
})
export class JoinModule {}
