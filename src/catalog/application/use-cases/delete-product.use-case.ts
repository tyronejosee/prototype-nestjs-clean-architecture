import { Injectable, Inject } from "@nestjs/common";
import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { UUID } from "@/catalog/domain/value-objects/uuid.value-object";
import { DeleteProductRequestDto } from "../dtos/product.dto";

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject("ProductRepositoryInterface")
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(request: DeleteProductRequestDto): Promise<boolean> {
    try {
      const productId = new UUID(request.id);
      const exists = await this.productRepository.exists(productId);

      if (!exists) return false;

      await this.productRepository.delete(productId);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete catalog item: ${error.message}`);
    }
  }
}
