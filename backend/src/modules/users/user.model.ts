import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import Collections from "../collections/collections.model";
import Notes from "../notes/notes.model";

@Entity()
class Users extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @OneToMany(
    type => Notes,
    (note: Notes) => note.user,
    {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  )
  notes: Notes[];

  @OneToMany(
    type => Notes,
    (collection: Collections) => collection.user,
    {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  )
  collections: Collections[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_on: string;

  @UpdateDateColumn()
  updated_on;
}
export default Users;
