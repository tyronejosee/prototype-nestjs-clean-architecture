import { Product } from "../entities/product.entity";
import { UUID } from "../value-objects/uuid.value-object";

export interface ProductRepositoryInterface {
  save(catalogItem: Product): Promise<Product>;
  findById(id: UUID): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  update(catalogItem: Product): Promise<Product>;
  delete(id: UUID): Promise<void>;
  exists(id: UUID): Promise<boolean>;
}
