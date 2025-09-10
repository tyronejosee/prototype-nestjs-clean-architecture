import { ApiProperty } from "@nestjs/swagger";
import { ProductOutputDto } from "./product-output.dto";

export class ProductListOutputDto {
  @ApiProperty({
    description: "List of products",
    type: [ProductOutputDto],
  })
  items: ProductOutputDto[];

  @ApiProperty({
    description: "Total number of products",
    example: 25,
  })
  total: number;
}
