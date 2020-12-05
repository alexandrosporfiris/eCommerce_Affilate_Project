import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { join } from 'path';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.use(bodyParser.json({limit: '50mb'}));
  app.enableCors();
  app.useStaticAssets(join(__dirname, '../public'));
  await app.listen(3000);
}

bootstrap();
