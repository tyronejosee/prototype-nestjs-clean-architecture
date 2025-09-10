import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CategoryInputDto } from "../dtos/category-input.dto";
import { CategoryOutputDto } from "../dtos/category-output.dto";
import { CreateCategoryUseCase } from "@/catalog/application/use-cases/create-category.use-case";
import { GetAllCategoriesUseCase } from "@/catalog/application/use-cases/get-all-categories.use-case";
import { CategoryListOutputDto } from "../dtos/category-list-output.dto";

@ApiTags("categories")
@Controller("categories")
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create category" })
  async create(@Body() dto: CategoryInputDto): Promise<CategoryOutputDto> {
    return this.createCategoryUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: "List categories" })
  async findAll(): Promise<CategoryListOutputDto> {
    return this.getAllCategoriesUseCase.execute();
  }
}
