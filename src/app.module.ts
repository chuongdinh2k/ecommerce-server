import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseAppModule } from './core/modules/mongoose';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [MongooseAppModule, AuthModule, UserModule, ProductModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
