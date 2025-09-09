import { ApiProperty } from "@nestjs/swagger";
import { CatalogItemResponseDto } from "./catalog-item-response.dto";

export class CatalogItemsListResponseDto {
  @ApiProperty({
    description: "List of catalog items",
    type: [CatalogItemResponseDto],
  })
  items: CatalogItemResponseDto[];

  @ApiProperty({
    description: "Total number of catalog items",
    example: 25,
  })
  total: number;
}
