import { Injectable } from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import {Request, Response} from "express"
import { InjectRepository } from '@nestjs/typeorm';
import { Homework } from 'src/domain/homework.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class HomeworkService {

  constructor(
    @InjectRepository(Homework)
    private homework : Repository<Homework>,
    private authService : AuthService,
    private roomServiec : RoomService
  ){}

  async create(createHomeworkDto: CreateHomeworkDto,req : Request) {//룸아이디 제모곡  제출기한 내용
    const token = this.authService.getToken(req)
    const verify = await this.authService.verify(token)
    const {name} = verify
    const roomdata = await this.roomServiec.findOne(createHomeworkDto.roomId)
    if(!roomdata){
      return {success : "그런방없습니다"}
    }

    if(roomdata.name != name ){
      return {success : "권한없다"}
    }
    const homeworkId = Math.floor(10000 + Math.random() * 90000).toString();
    createHomeworkDto.homeworkId = homeworkId
    createHomeworkDto.name = name
    await this.homework.save(createHomeworkDto)
    return {success : true}

  }

  findAll() {
    return `This action returns all homework`;
  }

  findOne(id: number) {
    return `This action returns a #${id} homework`;
  }

  update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
    return `This action updates a #${id} homework`;
  }

  async remove(homeworkId: string,req : Request) {
    const token = this.authService.getToken(req)
    const verify = await this.authService.verify(token)
    const {name} = verify
    
    const homeworkdata = await this.homework.findOne({where : {homeworkId}})
    if(homeworkdata.name != name){
      return {success : "권한없음"}
    }
    await this.homework.remove(homeworkdata)
    return{ success : true}


  }


  async findroomAll(roomId : number){
    const data = await this.homework.find({where : {roomId}})
    return data
    
  }
}
