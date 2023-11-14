import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UsePipes, BadRequestException, Res, Req } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { CreateSubmitDto } from './dto/create-submit.dto';
import { UpdateSubmitDto } from './dto/update-submit.dto';
import { userInfo } from 'os';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import{Request, Response} from "express"


@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Post("/uploads")
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File,@Body() body : CreateSubmitDto,@Res() res : Response,@Req() req : Request) {
    console.log(body)
    const fileName = await this.submitService.uploadFile(file,req,body);
    res.send(fileName);
  }

  @Post("/download/:id")
  async download(@Param("id") id: string,@Res() res : Response,@Req() req : Request){
    const data =await this.submitService.download(req,id)
    console.log(data)
    if(data.success ==false){
      return res.send( data)
    }
    res.download(`./src/uploads/${data.filename}`,data.filename)
  }

  @Get(":id")
  async findsubmit(@Param("id") id: string,@Res() res : Response,@Req() req : Request){
    const data = await this.submitService.findsubmit(id,req)
    return res.send(data)
  }


}
