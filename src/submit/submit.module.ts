import { BadRequestException, Module } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitController } from './submit.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submit } from 'src/domain/submit.entity';
import { Homework } from 'src/domain/homework.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/domain/user.entity';


@Module({
  
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join('./src/uploads')); // uploads 디렉토리로 저장
        },
        filename: (req, file, cb) => {
          const uniqueFileName = `${uuidv4()}-${file.originalname}`;
          cb(null,uniqueFileName) // 파일명은 업로드된 원래 파일명 사용
        },
      }),
      fileFilter(req, file, cb) {
        if(file.mimetype != 'application/zip'||!file.originalname){
          cb(new BadRequestException("받은파일이 zip이아닌데"),false)
        }else{
          cb (null,true)
        }
      },
    },),
    TypeOrmModule.forFeature([Submit,Homework,User]),AuthModule
  ],
  controllers: [SubmitController],
  providers: [SubmitService],
})
export class SubmitModule {}
