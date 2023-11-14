import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req,Res } from '@nestjs/common';
import { JoinService } from './join.service';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import {Request, Response} from "express"
import { FindJoinDto } from './dto/find-join.dto';

@Controller('join')
export class JoinController {
  constructor(private readonly joinService: JoinService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  async create(@Body() createJoinDto: CreateJoinDto, @Req() req : Request, @Res() res : Response) {
    res.send( await this.joinService.create(createJoinDto,req))
  }

  @Get("/findall")
  async findAll(@Body() body : FindJoinDto) {
    return await this.joinService.findAlll(body);
  }

  @Get("/findjoinroom")
  async findjoinroom(@Req() req : Request, @Res() res : Response) {
   const data = await this.joinService.findjoinroom(req)
   return res.send(data)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.joinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJoinDto: UpdateJoinDto) {
    return this.joinService.update(+id, updateJoinDto);
  }

  @Delete("/exile")
  async exile(@Body() body : UpdateJoinDto,@Req() req : Request, @Res() res : Response){
    res.send( await this.joinService.exile(body,req))
  }

  @Delete('/Exit')
  async remove(@Body() body : UpdateJoinDto,@Req() req : Request, @Res() res : Response) {
    res.send( await this.joinService.remove(body,req))
  }

}
