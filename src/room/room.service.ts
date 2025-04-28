import { Injectable } from '@nestjs/common';
import { Room } from './room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async getRoomforesp32(): Promise<string[]> {
    return (await this.roomModel.find().exec()).map(
      (item: any) =>
        `${item.block === 'block1' ? 1 : item.block === 'block2' ? 2 : item.block === 'block3' ? 3 : item.block === 'block4' ? 4 : ''}${item.floor}${item.room > 10 ? item.room : '0' + item.room}${item.status === 'empty' ? 0 : item.status === 'broned' ? 1 : 2}`,
    );
  }
  async getRoom(id: string): Promise<Room> {
    return this.roomModel.findById(id).exec();
  }
  async findRooms(filters: any): Promise<Room[]> {
    return this.roomModel.find(filters).exec();
  }
  async getAllRooms(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }
  async createRoom(roomData: Room): Promise<Room> {
    const newRoom = new this.roomModel(roomData);
    return newRoom.save();
  }

  async updateRoomStatus(
    id: string,
    status: 'empty' | 'broned' | 'selled',
  ): Promise<Room> {
    console.log(status + ' status');
    return this.roomModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }
}
