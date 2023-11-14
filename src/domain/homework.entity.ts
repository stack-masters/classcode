import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Room } from "./room.entity";
import { Submit } from "./submit.entity";

@Entity({schema : "classcode", name : "homework"})
export class Homework {
  
  @PrimaryColumn({name : "homeworkId", type : "varchar", length : "5"})
  homeworkId : string;

  @Column({name : "title", type : "varchar", length : "200"})
  title : string;

  @Column({name : "text", type : "varchar", length : "200"})
  text : string;

  @Column({name : "deadline", type : "datetime"})
  deadline : Date;

  @Column({name : "name", type : "varchar", length : "10"})
  name : string;

  @ManyToOne(()=>Room, (room)=>room.roomId,{onDelete : "CASCADE"})
  roomId : Room | number

  @OneToMany(()=>Submit, (submit)=>submit.homeworkId,{cascade : true})
  submit : Submit | number


}
