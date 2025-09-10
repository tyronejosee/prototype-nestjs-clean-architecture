import { Injectable, Inject } from "@nestjs/common";
import { Product } from "@/catalog/domain/entities/product.entity";
import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { ProductListResponseDto } from "../dtos/product.dto";

@Injectable()
export class GetAllProductsUseCase {
  constructor(
    @Inject("ProductRepositoryInterface")
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(): Promise<ProductListResponseDto> {
    try {
      const products = await this.productRepository.findAll();

      return {
        items: products.map(this.mapToResponseItem),
        total: products.length,
      };
    } catch (error) {
      throw new Error(`Failed to get all products: ${error.message}`);
    }
  }

  private mapToResponseItem(product: Product) {
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
}
