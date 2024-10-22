import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { PrismaService } from 'prisma/prisma.service';
import { CountryGateway } from './gateway/poll-country.gateway';

@Module({
  controllers: [CountryController],
  providers: [CountryService, PrismaService, CountryGateway],
})
export class CountryModule {}
