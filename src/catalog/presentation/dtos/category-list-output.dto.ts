import { ApiProperty } from "@nestjs/swagger";
import { CategoryOutputDto } from "./category-output.dto";

export class CategoryListOutputDto {
  @ApiProperty({
    description: "List of categories",
    type: [CategoryOutputDto],
  })
  items: CategoryOutputDto[];

  @ApiProperty({
    description: "Total number of categories",
    example: 25,
  })
  total: number;
}
