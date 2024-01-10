import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "timestamp", nullable: true, default: () => "NOW()" })
  createdOn!: Date | null;

  @Column({ type: "timestamp", nullable: true, default: () => "NOW()" })
  lastUpdated!: Date | null;
}
