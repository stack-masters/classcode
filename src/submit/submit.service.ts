import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubmitDto } from './dto/create-submit.dto';
import { UpdateSubmitDto } from './dto/update-submit.dto';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path'; // path 모듈 임포트
import{Request, Response} from "express"
import { InjectRepository } from '@nestjs/typeorm';
import { Submit } from 'src/domain/submit.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/domain/user.entity';
import { Homework } from 'src/domain/homework.entity';


@Injectable()
export class SubmitService {

  constructor(
    @InjectRepository(Submit)
    private submit : Repository<Submit>,
    @InjectRepository(User)
    private user : Repository<User>,
    @InjectRepository(Homework)
    private homework : Repository<Homework>,
    private authService : AuthService
  ){}

  async uploadFile(file :Express.Multer.File,req : Request,body : CreateSubmitDto) {
    if(!file){
      console.log(file)
      throw new BadRequestException("받은파일이 없는데?")
    }
    const random = Math.floor(10000 + Math.random() * 90000).toString();
    const token = this.authService.getToken(req)
    const verify = await this.authService.verify(token)
    const {name} = verify
    const {homeworkId} = body
    const userdata = await this.user.findOne({where : {name}})
    const homeworkdata = await this.homework.findOne({where : {homeworkId}})
    if(!homeworkdata){
      return {success : "그런숙제없ㅇ음"}
    }
    const currentDatetime = new Date();
    body.time = "제출함"
    if( homeworkdata.deadline < currentDatetime){
      body.time="늦게제출함"
    }
    
    body.userId = userdata.userId
    body.homeworkId = homeworkId
    body.name = name
    body.file = file.filename
    body.submitId = random
    console.log(body)
    await this.submit.save(body)
    return {success : true}

  }


  async download(req : Request,submitId : string){
    const token = this.authService.getToken(req)
    const verify = await this.authService.verify(token)
    const {name} = verify
    const submitdata = await this.submit.findOne({where : {submitId}})
    if(!submitdata){
      //throw new BadRequestException("진짜그런거없어요")
      return {success : false}
    }
    return {filename : submitdata.file, success:  true}
  }

  create(createSubmitDto: CreateSubmitDto) {
    return 'This action adds a new submit';
  }

  async findsubmit(homeworkId,req) {
    const token = this.authService.getToken(req)
    const verify = await this.authService.verify(token)
    const {name} = verify
    const data = await this.submit.find({where : {homeworkId}})

    return data

    }

  findOne(id: number) {
    return `This action returns a #${id} submit`;
  }

  update(id: number, updateSubmitDto: UpdateSubmitDto) {
    return `This action updates a #${id} submit`;
  }

  remove(id: number) {
    return `This action removes a #${id} submit`;
  }
}
