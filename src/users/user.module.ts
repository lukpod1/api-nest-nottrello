import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserSchema } from './schemas/user.schema';

@Module({
    imports:[MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    controllers:[UserController],
    providers: [UserService]
})
export class UserModule {}