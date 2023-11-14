import { Exclude } from "class-transformer";
import { IsDateString, IsNumber, IsString, Length } from "class-validator";

export class CreateHomeworkDto {
  @Exclude()
  homeworkId : string;

  @Exclude  ()
  name : string

  @IsString()
  @Length(1,200)
  title : string;

  @IsString()
  @Length(1,200)
  text : string;

  @IsNumber()
  roomId :  number

  @IsDateString()
  deadline : Date
}
