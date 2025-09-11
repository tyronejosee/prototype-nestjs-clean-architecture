import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { UUID } from "@/catalog/domain/value-objects/uuid.value-object";
import { DeleteProductRequestDto } from "../dtos/product.dto";
import { ProductNotFoundException } from "@/catalog/domain/exceptions/domain.exception";

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(request: DeleteProductRequestDto): Promise<boolean> {
    const productId = new UUID(request.id);
    const exists = await this.productRepository.exists(productId);
    if (!exists) throw new ProductNotFoundException(`Product with ID ${request.id} not found`);

    await this.productRepository.delete(productId);
    return true;
  }
}
