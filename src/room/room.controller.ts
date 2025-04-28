import { Controller, Put, Body, Get, Query, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.schema';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import mqtt from 'mqtt';

class UpdateRoomStatusDto {
  @ApiProperty({
    description: 'Status of the room',
    enum: ['empty', 'broned', 'selled'],
    example: 'empty',
  })
  @IsEnum(['empty', 'broned', 'selled'])
  status: 'empty' | 'broned' | 'selled';
  @ApiProperty()
  id: string;
}
class UploadToMqttDto {
  @ApiProperty()
  data: string;
}
@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  private client: mqtt.MqttClient;

  onModuleInit() {
    this.client = mqtt.connect('mqtt://185.217.131.96:1883', {
      username: 'tr12345678',
      password: 'tr12345678',
    });
    console.log('MQTT ulanish...', this.client);

    this.client.on('connect', () => {
      console.log('MQTT ga ulandi');
    });

    this.client.on('error', (err) => {
      console.error('MQTT xatolik:', err);
    });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a room by id' })
  @ApiResponse({ status: 200, description: 'Room found.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async getRoomById(@Query('id') id: string): Promise<Room> {
    return this.roomService.getRoom(id);
  }
  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'List of rooms.' })
  async getAllRooms(): Promise<Room[]> {
    return this.roomService.getAllRooms();
  }
  @Get('getRoomforesp32')
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'List of rooms.' })
  async getRoomforesp32(): Promise<string[]> {
    return this.roomService.getRoomforesp32();
  }
  @Get('by-filter')
  @ApiOperation({ summary: 'Get all rooms with filters' })
  @ApiResponse({ status: 200, description: 'List of rooms.' })
  async findRooms(
    @Query('room') room?: number,
    @Query('block') block?: 'block1' | 'block2' | 'block3' | 'block4',
    @Query('floor') floor?: number,
    @Query('status') status?: 'empty' | 'broned' | 'selled',
  ): Promise<Room[]> {
    const filters = { room, block, floor, status };
    return this.roomService.findRooms(filters);
  }

  @Post('/create-room')
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'Room created successfully.' })
  async createRoom(@Body() roomData: Room) {
    return this.roomService.createRoom(roomData);
  }

  @Put('status')
  @ApiOperation({ summary: 'Update room status' })
  @ApiResponse({
    status: 200,
    description: 'Room status updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Room not found.',
  })
  async updateRoomStatus(@Body() updateRoomStatusDto: UpdateRoomStatusDto) {
    return this.roomService.updateRoomStatus(
      updateRoomStatusDto.id,
      updateRoomStatusDto.status,
    );
  }
  @Post('submit')
  @ApiOperation({ summary: 'Submit data' })
  @ApiResponse({
    status: 200,
    description: 'Data submitted successfully.',
  })
  async submitData(@Body() body: UploadToMqttDto) {
    const data = body.data;
    this.client.publish('esp32/boulvar', data, (error) => {
      if (error) {
        console.error("Ma'lumotni MQTT ga yuborishda xatolik:", error);
      } else {
        console.log("Ma'lumot MQTT orqali yuborildi:", data);
      }
      console.log('bluat');
    });
    return { message: "Ma'lumot MQTT orqali ESP32 ga yuborildi" };
  }
}
