import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class Notes extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  note: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_on: string;

  @UpdateDateColumn()
  updated_on;
}
export default Notes;
