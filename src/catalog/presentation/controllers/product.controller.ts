import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";

// DTOs
import { ProductInputDto } from "../dtos/product-input.dto";
import { ProductOutputDto } from "../dtos/product-output.dto";
import { ProductListOutputDto } from "../dtos/product-list-output.dto";

// Use Cases
import { CreateProductUseCase } from "@/catalog/application/use-cases/create-product.use-case";
import { GetProductUseCase } from "@/catalog/application/use-cases/get-product.use-case";
import { GetAllProductsUseCase } from "@/catalog/application/use-cases/get-all-products.use-case";
import { UpdateProductUseCase } from "@/catalog/application/use-cases/update-product.use-case";
import { DeleteProductUseCase } from "@/catalog/application/use-cases/delete-product.use-case";
import {
  DomainException,
  ProductNotFoundException,
} from "@/catalog/domain/exceptions/domain.exception";

@ApiTags("catalog")
@Controller("products")
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiResponse({
    status: 201,
    description: "The product has been successfully created.",
    type: ProductOutputDto,
  })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async create(@Body() dto: ProductInputDto): Promise<ProductOutputDto> {
    try {
      const result = await this.createProductUseCase.execute({
        name: dto.name,
        description: dto.description,
        price: dto.price,
        currency: dto.currency,
        categoryId: dto.categoryId,
      });

      return result;
    } catch (error) {
      if (error instanceof DomainException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a product by ID" })
  @ApiParam({
    name: "id",
    description: "The UUID of the product",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 200,
    description: "The catalog item has been successfully retrieved.",
    type: ProductOutputDto,
  })
  @ApiNotFoundResponse({
    description: "Catalog item not found",
  })
  async findOne(@Param("id") id: string): Promise<ProductOutputDto> {
    try {
      return await this.getProductUseCase.execute({ id });
    } catch (error) {
      if (error instanceof ProductNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a product" })
  @ApiParam({
    name: "id",
    description: "The UUID of the product",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully updated.",
    type: ProductOutputDto,
  })
  @ApiNotFoundResponse({ description: "Catalog item not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async update(@Param("id") id: string, @Body() dto: ProductInputDto): Promise<ProductOutputDto> {
    try {
      return await this.updateProductUseCase.execute({ id, ...dto });
    } catch (error) {
      if (error instanceof ProductNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a product" })
  @ApiParam({
    name: "id",
    description: "The UUID of the product",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 204,
    description: "The product has been successfully deleted.",
  })
  @ApiNotFoundResponse({ description: "Product not found" })
  async remove(@Param("id") id: string): Promise<void> {
    try {
      await this.deleteProductUseCase.execute({ id });
    } catch (error) {
      if (error instanceof ProductNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: 200,
    description: "List of products has been successfully retrieved.",
    type: ProductListOutputDto,
  })
  async findAll(): Promise<ProductListOutputDto> {
    try {
      return await this.getAllProductsUseCase.execute();
    } catch (error) {
      if (error instanceof DomainException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
