import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { UUID } from "@/catalog/domain/value-objects/uuid.value-object";
import { ProductResponseDto, UpdateProductRequestDto } from "../dtos/product.dto";
import { ProductMapper } from "../mappers/product.mapper";
import { ProductNotFoundException } from "@/catalog/domain/exceptions/domain.exception";

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(request: UpdateProductRequestDto): Promise<ProductResponseDto | null> {
    const product = await this.productRepository.findById(new UUID(request.id));
    if (!product) throw new ProductNotFoundException(`Product with ID ${request.id} not found`);

    // Update basic info if provided
    if (request.name !== undefined || request.description !== undefined) {
      product.updateInfo(request.name ?? product.name, request.description ?? product.description);
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

    return ProductMapper.toResponse(updatedItem);
  }
}
