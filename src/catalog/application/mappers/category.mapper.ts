import { Category } from "@/catalog/domain/entities/category.entity";
import { CategoryResponseDto } from "../dtos/category.dto";

export class CategoryMapper {
  static toResponse(category: Category): CategoryResponseDto {
    return {
      id: category.id.value,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  static toResponseList(categories: Category[]): CategoryResponseDto[] {
    return categories.map(CategoryMapper.toResponse);
  }
}
