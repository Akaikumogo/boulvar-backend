// room/room.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from './room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
