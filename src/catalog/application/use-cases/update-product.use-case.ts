import { Injectable, Inject } from "@nestjs/common";
import { Product } from "@/catalog/domain/entities/product.entity";
import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { UUID } from "@/catalog/domain/value-objects/uuid.value-object";
import { ProductResponseDto, UpdateProductRequestDto } from "../dtos/product.dto";

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject("ProductRepositoryInterface")
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(request: UpdateProductRequestDto): Promise<ProductResponseDto | null> {
    try {
      const productId = new UUID(request.id);
      const product = await this.productRepository.findById(productId);

      if (!product) return null;

      // Update basic info if provided
      if (request.name !== undefined || request.description !== undefined) {
        product.updateInfo(
          request.name ?? product.name,
          request.description ?? product.description,
        );
      }

      // Update price if provided
      if (request.price !== undefined || request.currency !== undefined) {
        product.updatePrice(
          request.price ?? product.price.amount,
          request.currency ?? product.price.currency,
        );
      }

      // Update category if provided
      if (request.categoryId !== undefined) {
        product.updateCategory(request.categoryId);
      }

      product.validate();
      const updatedItem = await this.productRepository.update(product);

      return this.mapToResponse(updatedItem);
    } catch (error) {
      throw new Error(`Failed to update catalog item: ${error.message}`);
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
