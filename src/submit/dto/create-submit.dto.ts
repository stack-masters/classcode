import { Exclude } from "class-transformer";
import { IsString } from "class-validator";

export class CreateSubmitDto {

  @Exclude()
  submitId : string;

  @Exclude()
  name : string;

  @Exclude()
  file : string;

  @Exclude()
  time : string

  @Exclude()
  userId : number;

  @IsString()
  homeworkId : string

  
}
