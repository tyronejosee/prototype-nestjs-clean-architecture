import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { GetProductRequestDto, ProductResponseDto } from "../dtos/product.dto";
import { UUID } from "@/catalog/domain/value-objects/uuid.value-object";
import { ProductMapper } from "../mappers/product.mapper";
import { ProductNotFoundException } from "@/catalog/domain/exceptions/domain.exception";

export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(request: GetProductRequestDto): Promise<ProductResponseDto> {
    const product = await this.productRepository.findById(new UUID(request.id));
    if (!product) throw new ProductNotFoundException(`Product with ID ${request.id} not found`);
    return ProductMapper.toResponse(product);
  }
}
