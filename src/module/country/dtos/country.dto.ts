import { IsNotEmpty, IsString } from 'class-validator';

export class CountryDto {
  @IsString()
  @IsNotEmpty()
  label: string;
}
