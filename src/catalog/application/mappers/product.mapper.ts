import { Product } from "@/catalog/domain/entities/product.entity";
import { ProductResponseDto } from "../dtos/product.dto";

export class ProductMapper {
  static toResponse(product: Product): ProductResponseDto {
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
    };
  }

  static toResponseList(products: Product[]): ProductResponseDto[] {
    return products.map(ProductMapper.toResponse);
  }
}
