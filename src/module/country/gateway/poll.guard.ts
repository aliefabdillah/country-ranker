import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as useragent from 'useragent';
import { hash } from 'src/utils/country.utils';

@Injectable()
export class PollGuard implements CanActivate {
  private users = {};

  // set Cool down in milliseconds
  private coolDown = 30 * 1000;

  // The magic number
  private magicNumber = +process.env.MAGIC_NUMBER;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get client
    const client = context.switchToWs().getClient();
    const socket = client.handshake;

    // get client adress and user-agent
    const userAgent = useragent.parse(socket.headers['user-agent']);
    const address = socket.address;

    // make handle
    const id = hash(
      userAgent.os.toString() + userAgent.device.toString() + this.magicNumber,
    );
    const handled = hash(id + address + this.magicNumber);

    // Check if the user is allowed to vote (cooldown check)
    if (
      typeof this.users[handled] === 'undefined' ||
      this.users[handled] + this.coolDown <= Date.now()
    ) {
      // Set the timestamp for cooldown
      this.users[handled] = Date.now();
      return true; // Allow the request to proceed
    } else {
      return false; // Deny the request (still in cooldown)
    }
  }
}
