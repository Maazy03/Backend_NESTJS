import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module'
// import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://Maaz:maaz1234@daraz-schema.z1pit.mongodb.net/daraz-ecommerce?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }), 
    ProductsModule
    
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
