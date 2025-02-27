import { Logger, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CountryService } from '../country.service';
import { PollGuard } from './poll.guard';
import { ICreateCountry } from '../interface/country.interface';

@WebSocketGateway(3001, { cors: true })
export class CountryGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private readonly logger = new Logger();
  @WebSocketServer() server: Server;

  constructor(private readonly countryService: CountryService) {}

  afterInit() {
    this.logger.log('Web Gateway initialized');
  }

  async handleConnection(client: Socket) {
    const connectedClients = this.server.engine.clientsCount;
    this.logger.log(`Number of User Connected ${connectedClients}`);
    this.logger.log(`User Connected with ID: ${client.id}`);

    const countryData = await this.countryService.findAll();
    this.server.emit('country', countryData);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`User Disconnected ${client.id}`);
    const connectedClients = this.server.engine.clientsCount;
    this.logger.log(`Number of User Connected ${connectedClients}`);
  }

  @UseGuards(PollGuard) // Poling Guard
  @SubscribeMessage('vote')
  async handleVoteEvent(@MessageBody('id') id: string) {
    const countryData = await this.countryService.update(id);

    // send broadcase to all client
    this.server.emit('country', countryData);
  }

  @SubscribeMessage('new-country')
  async handleAddCountry(@MessageBody('label') label: string) {
    const countryFields: ICreateCountry = {
      label: label,
    };
    const countryData = await this.countryService.create(countryFields);

    this.server.emit('country', countryData);
  }
}
