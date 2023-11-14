import { Injectable } from '@nestjs/common';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Join } from 'src/domain/join.entity';
import { IsNull, Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import {Request, Response} from "express"
import { Room } from 'src/domain/room.entity';
import { User } from 'src/domain/user.entity';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { FindJoinDto } from './dto/find-join.dto';

@Injectable()
export class JoinService {

  constructor(
    @InjectRepository(Join)
    private join : Repository<Join>,
    private authService : AuthService,
    @InjectRepository(Room)
    private room : Repository<Room>,
    @InjectRepository(User)
    private user : Repository<User>,
  ){}

  async managerJoin(name,random5Digit,userId,roomName){
    const joinId = Math.floor(10000 + Math.random() * 90000).toString();
    const roomManager = name
    const roomId = random5Digit
    const data = {joinId,name,roomManager,roomName,userId,roomId}
    await this.join.save(data)
  }

  async create(createJoinDto: CreateJoinDto,req : Request) {
    const token = this.authService.getToken(req)
    const randomFiveDigitNumber = Math.floor(10000 + Math.random() * 90000).toString();
    if(!token){
      return {success : "로그인부터"}
    }
    const verify = await this.authService.verify(token)
    const {name} = verify
    const roomdata = await this.findKey(createJoinDto.joinKey)
    const finduserId = await this.finduserId(name)
    if(!roomdata){
      return {success : "그런거 존재하지않는다"}
    }
    createJoinDto.joinId = randomFiveDigitNumber;
    createJoinDto.name = name
    createJoinDto.roomId = roomdata.roomId
    createJoinDto.roomManager = roomdata.name
    createJoinDto.userId = finduserId.userId
    createJoinDto.roomName = roomdata.roomName

    await this.join.save(createJoinDto)
    return {success : true}
  }

  async finduserId(name : string){
    const data = await this.user.findOne({where : {name}})
    if(!data){
      return null
    }
    return data
  }

  async findKey(joinKey : string){
    const data = await this.room.findOne({where : {joinKey}})
    if(!data){
      return null
    }
    return data
  }

  async findAlll(findJoinDto : FindJoinDto) {
    const roomId = findJoinDto.roomId
    return await this.join.find({where : {roomId}})
  }

  findOne(id: number) {
    return `This action returns a #${id} join`;
  }

  update(id: number, updateJoinDto: UpdateJoinDto) {
    return `This action updates a #${id} join`;
  }

  async remove(updateJoinDto : UpdateJoinDto,req : Request) {
    const {joinId} = updateJoinDto
    const joindata = await this.join.findOne({where : {joinId}})
    const token = this.authService.getToken(req)
    console.log(joinId)
    if(!token){
      return {success : "로그인부터"}
    }
    const verify = await this.authService.verify(token)
    const {name} = verify
    if(!joindata){
      return {success : "그런거없습니다"}
    }
    if(joindata.name!=name){
      return {success : "권한없어"}
    }
    await this.join.remove(joindata)
    return {success : true}

  }

  async exile(updateJoinDto : UpdateJoinDto,req : Request){
    const {joinId} = updateJoinDto
    const joindata = await this.join.findOne({where : {joinId}})
    const token = this.authService.getToken(req)
    console.log(joinId)
    if(!token){
      return {success : "로그인부터"}
    }
    const verify = await this.authService.verify(token)
    const {name} = verify
    if(!joindata){
      return {success : "그런거없습니다"}
    }
    
    if(joindata.roomManager!=name){
      return {success : "권한없다이기야"}
    }
    await this.join.remove(joindata)
    return {success: true} 
  }

  async findjoinroom(req : Request){
    const token = this.authService.getToken(req)
    if(!token){
      return {success : "로그인부터"}
    }
    const verify = await this.authService.verify(token)
    const {name} = verify
    const data = await this.join.find({where : {name}})
    if(!data){
      return {success : "참가중인방이없어요"}
    }
    return {data : data, success : true}
  }
}