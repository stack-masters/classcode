import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Join } from "./join.entity";
import { Homework } from "./homework.entity";

@Entity({schema : "classcode", name : "room"})
export class Room {

  //생성자 id 생성 이름 방번보 방닉 

  @PrimaryGeneratedColumn({name : "roomId", type : "int"})
  roomId : number

  @Column({name : "roomName", type : "varchar", length : "30"})
  roomName : string;

  @Column({name : "joinKey", type : "varchar", length : "10"})
  joinKey : string;

  @Column({name : "name", type : "varchar", length : "10"})
  name : string;

  @ManyToOne(()=>User,(user)=>user.userId,{onDelete : "CASCADE"})
  userId : User | number

  @OneToMany(()=>Join,(join)=>join.roomId,{cascade : true})
  join : Join

  @OneToMany(()=>Homework,(homework)=>homework.roomId,{cascade : true})
   homework : Homework[]
}
