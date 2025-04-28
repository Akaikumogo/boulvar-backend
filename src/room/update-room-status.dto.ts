// room/dto/update-room-status.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoomStatusDto {
  @ApiProperty({
    description: 'Room status',
    enum: ['empty', 'broned', 'selled'],
  })
  status: 'empty' | 'broned' | 'selled';
}
