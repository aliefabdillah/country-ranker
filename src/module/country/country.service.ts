import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ICreateCountry } from './interface/country.interface';
import { randomRGB } from 'src/utils/country.utils';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async create(countryFields: ICreateCountry) {
    const color = randomRGB();
    const data = {
      color: color,
      label: countryFields.label,
    };

    try {
      const newCountry = await this.prisma.country.create({
        data,
      });
      return newCountry;
    } catch (error) {
      console.error(error);
      throw new UnprocessableEntityException();
    }
  }
}
