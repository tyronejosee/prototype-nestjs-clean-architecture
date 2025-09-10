import { Injectable, Inject } from "@nestjs/common";
import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { Product } from "@/catalog/domain/entities/product.entity";
import { GetProductRequestDto, ProductResponseDto } from "../dtos/product.dto";
import { UUID } from "@/catalog/domain/value-objects/uuid.value-object";

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject("ProductRepositoryInterface")
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(request: GetProductRequestDto): Promise<ProductResponseDto | null> {
    try {
      const productId = new UUID(request.id);
      const product = await this.productRepository.findById(productId);

      if (!product) return null;

      return this.mapToResponse(product);
    } catch (error) {
      throw new Error(`Failed to get product: ${error.message}`);
    }
  }

  private mapToResponse(product: Product): ProductResponseDto {
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
