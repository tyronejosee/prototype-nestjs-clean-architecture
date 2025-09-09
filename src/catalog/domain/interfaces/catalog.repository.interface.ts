import { CatalogItem } from "../entities/catalog-item.entity";
import { CatalogId } from "../value-objects/catalog-id.value-object";

export interface CatalogRepositoryInterface {
  save(catalogItem: CatalogItem): Promise<CatalogItem>;
  findById(id: CatalogId): Promise<CatalogItem | null>;
  findAll(): Promise<CatalogItem[]>;
  update(catalogItem: CatalogItem): Promise<CatalogItem>;
  delete(id: CatalogId): Promise<void>;
  exists(id: CatalogId): Promise<boolean>;
}
