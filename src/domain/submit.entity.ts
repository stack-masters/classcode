import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Homework } from "./homework.entity";

@Entity({schema : "classcode", name : "submit"})
export class Submit {
  @PrimaryColumn({name : "submitId", type : "varchar", length : "5"})
  submitId : string;

  @Column({name : "file", type : "text"})
  file : string;

  @Column({name : "name", type : "varchar", length : "10"})//
  name : string

  @Column({name : "time", type : "varchar", length : "10"})//
  time : string

  @ManyToOne(()=>User,(user)=>user.userId,{onDelete : "CASCADE"})
  userId : User | number

  @ManyToOne(()=>Homework,(homework)=>homework.homeworkId,{onDelete : "CASCADE"})
  homeworkId : Homework | string

  



}
