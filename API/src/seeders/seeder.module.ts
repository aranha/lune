import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Seeder } from './seeder';
import Environment from '../enviroments';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forRoot(Environment.api_url), UserModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
