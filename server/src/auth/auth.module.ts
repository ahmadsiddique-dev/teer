import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: userSchema}])
  ],
  exports: [
    AuthService, MongooseModule
  ]
})
export class AuthModule {}
