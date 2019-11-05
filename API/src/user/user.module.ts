import { UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controllers';
import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { EventModule } from 'src/event/event.module';



const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    passportModule, forwardRef(() => EventModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
