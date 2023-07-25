import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const MongooseAppModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    // uri: configService.get<string>('MONGODB_CONNECTION_STRING'),
    uri: 'mongodb+srv://dinhvanchuong2k:chuong2532000@cluster0.7vxmhkd.mongodb.net/',
  }),
});
