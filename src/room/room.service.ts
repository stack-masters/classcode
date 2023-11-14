import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import{Request, Response} from "express"
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/domain/room.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import * as randomstring from 'randomstring';
import { User } from 'src/domain/user.entity';
import { JoinService } from 'src/join/join.service';

@Injectable()
export class RoomService {

  constructor(
    @InjectRepository(Room)
    private room : Repository<Room>,
    private authService : AuthService,
    @InjectRepository(User)
    private user : Repository<User>,

    private joinService : JoinService
  ){}

  async create(createRoomDto: CreateRoomDto, req : Request) {
    const token = this.getToken(req)
    if(!token){
      return {success : "유효하지못한토큰"}
    }
    const verify = await this.authService.verify(token)
    const {name} = verify
    const random5Digit = Math.floor(10000 + Math.random() * 90000);//방버노
    const randomString = randomstring.generate(10);//창여코드
    const userdata = await this.finduser(name)
    createRoomDto.joinKey = randomString;
    createRoomDto.name = name
    createRoomDto.roomId = random5Digit;
    createRoomDto.userId = userdata.userId

    if(!userdata){
      return {success : "찾을수없음"}
    }

    await this.room.save(createRoomDto)
    await this.joinService.managerJoin(name,random5Digit,userdata.userId,createRoomDto.roomName)
    return {success : true}
  }

  async finduser(name : string){
    const data = await this.user.findOne({where : {name}})
    if(!data){
      return null
    }
    return data
  }



  findAll() {
    return `This action returns all room`;
  }

  findOne(roomId: number) {
    return this.room.findOne({where : {roomId}})
  }

  async update(roomId: number, updateRoomDto: UpdateRoomDto,req : Request) {
    const token = this.getToken(req);
    if(!token){
      return {success : "로그인부터"}
    }
    const verify = await this.authService.verify(token)
    const {name} = verify
    const data = await this.room.findOne({where : {name,roomId}});
    if(!data){
      return {success : "수정할 방없음"} 
    }
    data.roomName = updateRoomDto.roomName
    await this.room.save(data)
    return {success : true}
  }

  async remove(body: UpdateRoomDto, req : Request) {

    const token = this.getToken(req);
    if(!token){
      return {success : "로그인부터"}
    }
    console.log(body.roomId)
    const verify = await this.authService.verify(token)
    const {name} = verify
    const roomId = body.roomId
    const data = await this.room.findOne({where : {name,roomId}});
    console.log(data)
    if(!data){
      return {success : "삭제할 방없음"} 
    }
    await this.room.remove(data)
    return {success : true}

  }
  
getToken(req : Request){
  const authorization = req.headers.authorization;
  if(authorization && authorization.startsWith("Bearer ")){//Bearer으로 시작하는 문자열 찾기 
    return authorization.split(" ")[1]//공백을 기준으로 배열로 분할 
  }
  return null
  }
}
