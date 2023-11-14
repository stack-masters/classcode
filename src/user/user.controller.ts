import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import {Request, Response} from "express"
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete("/delete")
  @UseGuards(JwtAuthGuard)
   async remove(@Req() req : Request, @Res() res : Response) {
    res.send( await this.userService.remove(req))
  }
}
