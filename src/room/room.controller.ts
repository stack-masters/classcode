import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import{Request, Response} from "express"
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  async create(@Body() createRoomDto: CreateRoomDto, @Res() res : Response, @Req() req : Request) {
    res.send( await this.roomService.create(createRoomDto,req))
  }

  @Get("/findall")
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto, @Req() req : Request) {
    return this.roomService.update(id, updateRoomDto,req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Body() body : UpdateRoomDto, @Req() req : Request, @Res() res : Response) {
    res.send( await this.roomService.remove(body,req))
  }
}
