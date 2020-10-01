import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import Notes from "../notes/notes.model";
import Users from "../users/user.model";

@Entity()
class Collections extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(
    _type => Users,
    (users: Users) => users.collections,
    {},
  )
  @JoinColumn({ name: "user_id" })
  user: Users;

  @OneToMany(
    type => Notes,
    (note: Notes) => note.user,
    {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  )
  notes: Notes[];

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_on: string;

  @UpdateDateColumn()
  updated_on;
}
export default Collections;
