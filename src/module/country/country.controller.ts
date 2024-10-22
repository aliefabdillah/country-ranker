import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryDto } from './dtos/country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  addCountry(@Body() countryDto: CountryDto) {
    return this.countryService.create(countryDto);
  }

  @Get()
  getCountry() {
    return this.countryService.findAll();
  }

  @Patch('/:id')
  updateVotes(@Param('id') id: string) {
    return this.countryService.update(id);
  }
}
