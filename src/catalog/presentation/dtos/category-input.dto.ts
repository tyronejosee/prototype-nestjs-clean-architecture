import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length } from "class-validator";

export class CategoryInputDto {
  @ApiProperty({ description: "Category name", example: "Beverages" })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;
}
