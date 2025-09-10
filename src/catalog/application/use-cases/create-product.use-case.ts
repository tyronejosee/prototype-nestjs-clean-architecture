import { Injectable, Inject } from "@nestjs/common";
import { Product } from "@/catalog/domain/entities/product.entity";
import { ProductFactory } from "@/catalog/domain/factories/product.factory";
import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { CreateProductRequestDto, ProductResponseDto } from "../dtos/product.dto";

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject("ProductRepositoryInterface")
    private readonly productRespository: ProductRepositoryInterface,
    private readonly productFactory: ProductFactory,
  ) {}

  async execute(request: CreateProductRequestDto): Promise<ProductResponseDto> {
    try {
      const catalogItem = this.productFactory.create({
        name: request.name,
        description: request.description,
        price: request.price,
        currency: request.currency,
        categoryId: request.categoryId,
      });

      const savedItem = await this.productRespository.save(catalogItem);

      return this.mapToResponse(savedItem);
    } catch (error) {
      throw new Error(`Failed to create catalog item: ${error.message}`);
    }
  }

  private mapToResponse(catalogItem: Product): ProductResponseDto {
    return {
      id: catalogItem.id.value,
      name: catalogItem.name,
      description: catalogItem.description,
      price: catalogItem.price.amount,
      currency: catalogItem.price.currency,
      categoryId: catalogItem.categoryId,
      isActive: catalogItem.isActive,
      createdAt: catalogItem.createdAt,
      updatedAt: catalogItem.updatedAt,
    };
  }
}
