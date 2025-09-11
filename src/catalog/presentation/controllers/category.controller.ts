import { Controller, Get, Post, Body, BadRequestException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from "@nestjs/swagger";
import { CategoryInputDto } from "../dtos/category-input.dto";
import { CategoryOutputDto } from "../dtos/category-output.dto";
import { CreateCategoryUseCase } from "@/catalog/application/use-cases/create-category.use-case";
import { GetAllCategoriesUseCase } from "@/catalog/application/use-cases/get-all-categories.use-case";
import { CategoryListOutputDto } from "../dtos/category-list-output.dto";
import { DomainException } from "@/catalog/domain/exceptions/domain.exception";

@ApiTags("categories")
@Controller("categories")
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create category" })
  @ApiResponse({
    status: 201,
    description: "The category has been successfully created.",
    type: CategoryInputDto,
  })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async create(@Body() dto: CategoryInputDto): Promise<CategoryOutputDto> {
    try {
      return this.createCategoryUseCase.execute(dto);
    } catch (error) {
      if (error instanceof DomainException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all categories" })
  @ApiResponse({
    status: 200,
    description: "List of categories has been successfully retrieved.",
    type: CategoryListOutputDto,
  })
  async findAll(): Promise<CategoryListOutputDto> {
    try {
      return this.getAllCategoriesUseCase.execute();
    } catch (error) {
      if (error instanceof DomainException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
