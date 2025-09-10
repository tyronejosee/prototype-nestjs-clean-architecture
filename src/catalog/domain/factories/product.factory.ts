import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { Price } from "../value-objects/price.value-object";

export interface CreateCatalogItemData {
  name: string;
  description: string;
  price: number;
  currency: string;
  categoryId: string;
  id?: string;
}

@Injectable()
export class ProductFactory {
  create(data: CreateCatalogItemData): Product {
    try {
      const price = new Price(data.price, data.currency);

      const item = Product.create(data.name, data.description, price, data.categoryId);

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
    categoryId: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
  ): Product {
    try {
      return Product.fromPersistence(
        id,
        name,
        description,
        price,
        currency,
        categoryId,
        isActive,
        createdAt,
        updatedAt,
      );
    } catch (error) {
      throw new Error(`Failed to create catalog item from persistence: ${error.message}`);
    }
  }
}
