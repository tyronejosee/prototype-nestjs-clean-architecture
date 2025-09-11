import { Category } from "../entities/category.entity";
import { UUID } from "../value-objects/uuid.value-object";

export interface CategoryRepositoryInterface {
  save(category: Category): Promise<Category>;
  findById(id: UUID): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  update(category: Category): Promise<Category>;
  delete(id: UUID): Promise<void>;
  exists(id: UUID): Promise<boolean>;
}
