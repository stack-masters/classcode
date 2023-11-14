import { IsNumber } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";
import { Join } from "./join.entity";
import { Submit } from "./submit.entity";

@Entity({schema : "classcode", name : "user"})
export class User {

  @PrimaryGeneratedColumn({name : "userId", type : "int"})
  userId : number

  @Column({name : "name", type : "varchar", length : "10", unique : true})//
  name : string

  @Column({name : "password", type : "varchar", length : "18"})
  password : string

  @OneToMany(()=>Room, (room)=>room.userId,{cascade : true})
  room : Room[]
  
  @OneToMany(()=>Join,(join)=>join.userId,{cascade : true})
  join : Join

  @OneToMany(()=>Submit,(submit)=>submit.userId,{cascade : true})
  submit : Submit

}
