import { PaginatedDto } from "./common.dto";

// Base
export class CategoryDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Responses
export type CategoryResponseDto = CategoryDto;

export type CategoryListResponseDto = PaginatedDto<CategoryResponseDto>;

// Requests
export type CreateCategoryRequestDto = Omit<CategoryDto, "id" | "createdAt" | "updatedAt">;

export type UpdateCategoryRequestDto = Partial<
  Omit<CategoryDto, "id" | "createdAt" | "updatedAt">
> &
  Pick<CategoryDto, "id">;

export type DeleteCategoryRequestDto = Pick<CategoryDto, "id">;

export type GetCategoryRequestDto = Pick<CategoryDto, "id">;
