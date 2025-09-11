import { Category } from "@/catalog/domain/entities/category.entity";
import { CategoryRepositoryInterface } from "@/catalog/domain/interfaces/category.repository.interface";
import { CategoryResponseDto, CreateCategoryRequestDto } from "../dtos/category.dto";
import { CategoryMapper } from "../mappers/category.mapper";

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepositoryInterface) {}

  async execute(request: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
    const category = Category.create(request.name);
    category.validate();

    const saved = await this.categoryRepository.save(category);
    return CategoryMapper.toResponse(saved);
  }
}
