import { Exclude } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class FindJoinDto {
 
  @IsNumber()
  roomId : number

}
