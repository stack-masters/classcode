import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private user : Repository<User>,
    private authService : AuthService
  ){}

  async create(createUserDto: CreateUserDto) {
    const random5Digit = Math.floor(10000 + Math.random() * 90000);
    if(await this.findOne(createUserDto.name)){
      createUserDto.userId = random5Digit
      await this.user.save(createUserDto)
      return {success : true}
    }else{
      return {success : false}
    }
  }

  async findOne(name : string) {//중복검사 없으면 true
    const data = await this.user.findOne({where : {name}})
    if(!data){
      return true
    }
    return false
  }

  async remove(req : Request) {
    const token = this.getToken(req)
    if(!token){
      return {success : "음 토큰이 없는데요?"}
  }
  const verify  = await this.authService.verify(token)
  const {name} = verify
  const data = await this.user.findOne({where : {name}})
  if(!data){
    return {success : "삭제할 데이터없음"}
  }
  await this.user.remove(data)
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
