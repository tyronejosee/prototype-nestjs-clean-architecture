import { PaginatedDto } from "./common.dto";

// Base
export class ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  categoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Responses
export type ProductResponseDto = ProductDto;

export type ProductListResponseDto = PaginatedDto<ProductResponseDto>;

// Requests
export type CreateProductRequestDto = Omit<
  ProductDto,
  "id" | "isActive" | "createdAt" | "updatedAt"
>;

export type UpdateProductRequestDto = Partial<Omit<ProductDto, "id" | "createdAt" | "updatedAt">> &
  Pick<ProductDto, "id">;

export type DeleteProductRequestDto = Pick<ProductDto, "id">;

export type GetProductRequestDto = Pick<ProductDto, "id">;
