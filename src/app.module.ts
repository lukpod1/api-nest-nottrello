import { config } from 'dotenv';
import { UserModule } from './users/user.module';
import { UserService } from './users/user.service';
import { UserController } from './users/user.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongooseModule } from "@nestjs/mongoose";
require('dotenv').config();

@Module({
  // The forRoot() method accepts the same configuration object as mongoose.connect() from the Mongoose package
  imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-gnwjs.mongodb.net/nottrello?retryWrites=true&w=majority`),
  UserModule  
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
