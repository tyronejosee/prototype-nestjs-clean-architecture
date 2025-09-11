import { Product } from "@/catalog/domain/entities/product.entity";
import { ProductModel } from "../models/product.model";

export class ProductPersistenceMapper {
  static toModel(product: Product): ProductModel {
    return {
      id: product.id.value,
      name: product.name,
      description: product.description,
      price: product.price.amount,
      currency: product.price.currency,
      categoryId: product.categoryId,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    } as ProductModel;
  }

  static toDomain(model: ProductModel): Product {
    return Product.fromPersistence(
      model.id,
      model.name,
      model.description,
      model.price,
      model.currency,
      model.categoryId,
      model.isActive,
      model.createdAt,
      model.updatedAt,
    );
  }
}
