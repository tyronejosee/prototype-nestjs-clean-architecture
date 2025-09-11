import { CategoryRepositoryInterface } from "@/catalog/domain/interfaces/category.repository.interface";
import { CategoryListResponseDto } from "../dtos/category.dto";
import { CategoryMapper } from "../mappers/category.mapper";

export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepositoryInterface) {}

  async execute(): Promise<CategoryListResponseDto> {
    const categories = await this.categoryRepository.findAll();
    return {
      items: CategoryMapper.toResponseList(categories),
      total: categories.length,
    };
  }
}
