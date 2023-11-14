import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate{

  constructor(
    private jwtService : JwtService
  ){}

  async canActivate(context : ExecutionContext){
    const req = context.switchToHttp().getRequest();
    const token = this.getToken(req);

    if(!token){
      throw new UnauthorizedException("토큰이없어요")
    }

    try{
      await this.jwtService.verifyAsync(token,{secret : "secret"});
      return true
    }catch{
      throw new UnauthorizedException("인증실패")
    }

  }

  getToken(req : Request){
    const authorization = req.headers.authorization;
    if(authorization && authorization.startsWith("Bearer ")){//Bearer으로 시작하는 문자열 찾기 
      return authorization.split(" ")[1]//공백을 기준으로 배열로 분할 
    }
    return null

  }
}