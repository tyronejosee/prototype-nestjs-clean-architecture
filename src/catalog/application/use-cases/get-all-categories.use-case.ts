import { Injectable, Inject } from "@nestjs/common";
import { Category } from "@/catalog/domain/entities/category.entity";
import { CategoryRepositoryInterface } from "@/catalog/domain/interfaces/catagory.repository.interface";

export interface GetAllCategoriesResponse {
  items: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  total: number;
}

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(
    @Inject("CategoryRepositoryInterface")
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  async execute(): Promise<GetAllCategoriesResponse> {
    const categories = await this.categoryRepository.findAll();

    return {
      items: categories.map(this.mapToResponse),
      total: categories.length,
    };
  }

  private mapToResponse(category: Category) {
    return {
      id: category.id.value,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
