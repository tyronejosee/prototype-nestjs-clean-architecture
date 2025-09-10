import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CategoryModel } from "./category.model";

@Entity("catalog_product")
@Index(["name", "category"])
export class ProductModel {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "varchar", length: 3 })
  currency: string;

  @Column("uuid")
  categoryId: string;

  @ManyToOne(() => CategoryModel, (category) => category.products, { eager: true })
  @JoinColumn({ name: "categoryId" })
  category: CategoryModel;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
