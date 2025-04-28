import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://sarvarbekred147:sarvarbek.21@boulvar.cpki3mc.mongodb.net/?retryWrites=true&w=majority&appName=Boulvar',
    ),
    RoomModule,
  ],
})
export class AppModule {}
// KEvX9M9Skty5DqyF;
