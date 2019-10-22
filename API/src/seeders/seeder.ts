import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { users } from './data';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  async seed() {
    try {
      await this.users();
      this.logger.debug('Successfuly completed seeding users...');
    } catch (error) {
      this.logger.error(`Failed seeding users: ${error.message}`);
    }
  }

  async users() {
    for (const model of users) {
      try {
        const alreadySeeded = await this.userService.findOneById(model._id);
        if (!alreadySeeded) {
          const user = await this.userService.create(model);
          this.logger.debug(
            `Successfuly completed seeding user: ${user.firstName} ${user.lastName}`,
          );
        } else {
          this.logger.debug(
            `User ${alreadySeeded.firstName} ${alreadySeeded.lastName} already in the database!`,
          );
        }
      } catch (error) {
        this.logger.error(`Failed seeding user: ${error.message}`);
      }
    }

    return;
  }
}
