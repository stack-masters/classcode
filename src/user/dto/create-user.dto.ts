import { Exclude } from "class-transformer";
import { IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CreateUserDto {

  @Exclude()
  userId : number;

  @IsString()
  @Length(2,7)
  name : string;

  @IsString()
  @Length(8,17)
  password : string;


}
