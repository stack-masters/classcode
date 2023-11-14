import { Controller, Get, Post, Body, Patch, Param, Delete,Req,Res } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import {Request, Response} from "express"

@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post("/create")
  async create(@Body() createHomeworkDto: CreateHomeworkDto, @Req() req : Request, @Res() res : Response) {
    res.send( await this.homeworkService.create(createHomeworkDto,req))
  }

  /*{
    "roomId" : 83566,
    "title" : "전유찬 병신",
    "text" : "서창현 개병신새끼",
    "deadline" : "2006-11-01"
}*/
  @Get()
  findAll() {
    return this.homeworkService.findAll();
  }

  @Get(":roomId")
  async findroomAll(@Param("roomId") roomId : number){
    return await this.homeworkService.findroomAll(roomId)
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeworkDto: UpdateHomeworkDto) {
    return this.homeworkService.update(+id, updateHomeworkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req : Request, @Res() res : Response) {
    res.send( await this.homeworkService.remove(id,req))
  }
}
