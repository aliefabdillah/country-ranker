import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [CountryController],
  providers: [CountryService, PrismaService],
})
export class CountryModule {}
