import { Exclude } from "class-transformer";
import { IsString } from "class-validator";

export class CreateJoinDto {
  @IsString()
  joinId : string;

  @Exclude()
  roomName : string;

  @Exclude()
  roomManager : string

  @Exclude()
  name : string

  @IsString()
  joinKey : string;

  @Exclude()
  userId : number

  @Exclude()
  roomId : number
  //joinId : " "



}
