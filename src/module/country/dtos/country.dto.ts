import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CountryDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsNumber()
  @IsOptional()
  votes: number;
}
