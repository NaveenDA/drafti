import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import Collections from "../collections/collections.model";
import Users from "../users/user.model";

@Entity()
class Notes extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(
    _type => Collections,
    (collection: Collections) => collection.notes,
    {},
  )
  @JoinColumn({ name: "collection_id" })
  collection: Collections;

  @ManyToOne(
    _type => Users,
    (users: Users) => users.notes,
    {},
  )
  @JoinColumn({ name: "user_id" })
  user: Users;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  note: string;

  @Column({ type: "text", nullable: true })
  raw_html: string;

  @Column({ default: false })
  is_shared: boolean;

  @Column({ type: "uuid", nullable: true })
  share_id: string;

  @Column({ nullable: true })
  cover_pic: string;

  @Column({ nullable: true })
  short_description: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_on: string;

  @UpdateDateColumn()
  updated_on;
}
export default Notes;
