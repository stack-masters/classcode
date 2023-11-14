import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Room } from "./room.entity";

@Entity({schema : "classcod", name : "join"})
export class Join {
  @PrimaryColumn({name : "joinId", type : "varchar", length : "5"})
  joinId : string;

  @Column({name : "roomName", type : "varchar", length : "30"})
  roomName : string;

  @Column({name : "roomManager", type : "varchar", length : "10"})
  roomManager : string

  @Column({name : "name", type : "varchar", length : "10"})
  name : string

  @ManyToOne(()=>User,(user)=>user.userId,{onDelete : "CASCADE"})
  userId : User | number

  @ManyToOne(()=>Room,(room)=>room.roomId,{onDelete : "CASCADE"})
  roomId : Room | number
}
