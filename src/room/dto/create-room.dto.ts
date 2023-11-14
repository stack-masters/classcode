import { Exclude } from "class-transformer";
import { IsNumber, IsString, Length } from "class-validator";

export class CreateRoomDto {
  @IsNumber()
  roomId : number;

  @IsString()
  @Length(3,30)
  roomName : string;

  @Exclude()
  joinKey : string

  @Exclude()
  name : string

  @Exclude()
  userId : number
}
