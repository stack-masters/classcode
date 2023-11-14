import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user.entity';
import { Repository } from 'typeorm';
import {Request, Response} from "express"

@Injectable()
export class AuthService {

  constructor(
    private JwtService : JwtService,
    @InjectRepository(User)
    private user : Repository<User>
  ){}
 
  async login(body : CreateAuthDto){
    const {name,password} = body
    console.log(body)
    const data = {name : name}
    const userdata = await this.user.findOne({where : {name,password}})

    console.log(userdata)
    if(!userdata){
      return {success : false}
    }
    try{
      const token = await this.JwtService.signAsync(data)
      return {token : token, success : true}
    }catch{
      throw new UnauthorizedException("로그인실패요")
    }
  }

  async verify(name : string){
    try{
      const verify =await this.JwtService.verifyAsync(name,{secret : "secret"})
      return verify
      
    }catch(error){
      throw new UnauthorizedException("로그인안됨")
    }

  }

  getToken(req : Request){
    const authorization = req.headers.authorization;
    if(authorization && authorization.startsWith("Bearer ")){//Bearer으로 시작하는 문자열 찾기 
      return authorization.split(" ")[1]//공백을 기준으로 배열로 분할 
    }
    return null
  }
  
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
