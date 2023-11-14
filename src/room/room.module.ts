import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/domain/room.entity';
import { User } from 'src/domain/user.entity';
import { JoinService } from 'src/join/join.service';
import { JoinModule } from 'src/join/join.module';

@Module({
  imports : [AuthModule,JoinModule,
  TypeOrmModule.forFeature([Room,User])
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports : [RoomService]
})
export class RoomModule {}
