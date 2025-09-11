import { Product } from "@/catalog/domain/entities/product.entity";
import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { CreateProductRequestDto, ProductResponseDto } from "../dtos/product.dto";
import { ProductMapper } from "../mappers/product.mapper";
import { Price } from "@/catalog/domain/value-objects/price.value-object";

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(request: CreateProductRequestDto): Promise<ProductResponseDto> {
    const product = Product.create(
      request.name,
      request.description,
      new Price(request.price, request.currency),
      request.categoryId,
    );
    product.validate();

    const savedItem = await this.productRepository.save(product);
    return ProductMapper.toResponse(savedItem);
  }
}
