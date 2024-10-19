import { Body, Controller, Post } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryDto } from './dtos/country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  addCountry(@Body() countryDto: CountryDto) {
    console.log(countryDto);
    return this.countryService.create(countryDto);
  }
}
