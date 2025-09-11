import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { ProductListResponseDto } from "../dtos/product.dto";
import { ProductMapper } from "../mappers/product.mapper";

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<ProductListResponseDto> {
    const products = await this.productRepository.findAll();
    return {
      items: ProductMapper.toResponseList(products),
      total: products.length,
    };
  }
}
