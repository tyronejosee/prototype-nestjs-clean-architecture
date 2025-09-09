import { Injectable } from "@nestjs/common";
import { CatalogItem } from "../entities/catalog-item.entity";

export interface CreateCatalogItemData {
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  id?: string;
}

@Injectable()
export class CatalogItemFactory {
  create(data: CreateCatalogItemData): CatalogItem {
    try {
      const item = CatalogItem.create(
        data.name,
        data.description,
        data.price,
        data.currency,
        data.category,
        data.id,
      );

      item.validate();
      return item;
    } catch (error) {
      throw new Error(`Failed to create catalog item: ${error.message}`);
    }
  }

  createFromPersistence(
    id: string,
    name: string,
    description: string,
    price: number,
    currency: string,
    category: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
  ): CatalogItem {
    try {
      return CatalogItem.fromPersistence(
        id,
        name,
        description,
        price,
        currency,
        category,
        isActive,
        createdAt,
        updatedAt,
      );
    } catch (error) {
      throw new Error(`Failed to create catalog item from persistence: ${error.message}`);
    }
  }
}
