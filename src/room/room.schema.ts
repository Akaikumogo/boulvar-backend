// room/room.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @ApiProperty({ description: 'Room number', example: 101 })
  @Prop({ required: true })
  room: number;

  @ApiProperty({
    description: 'Block of the room',
    enum: ['block1', 'block2', 'block3', 'block4'],
  })
  @Prop({ required: true, enum: ['block1', 'block2', 'block3', 'block4'] })
  block: string;

  @ApiProperty({ description: 'Floor number', example: 1 })
  @Prop({ required: true })
  floor: number;

  @ApiProperty({
    description: 'Status of the room',
    enum: ['empty', 'broned', 'selled'],
  })
  @Prop({ required: true, enum: ['empty', 'broned', 'selled'] })
  status: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
