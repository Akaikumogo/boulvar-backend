// room/dto/room-filter.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RoomFilterDto {
  @ApiPropertyOptional({ description: 'Room number', example: 101 })
  room?: number;

  @ApiPropertyOptional({
    description: 'Block',
    enum: ['block1', 'block2', 'block3', 'block4'],
  })
  block?: 'block1' | 'block2' | 'block3' | 'block4';

  @ApiPropertyOptional({ description: 'Floor number', example: 2 })
  floor?: number;

  @ApiPropertyOptional({
    description: 'Room status',
    enum: ['empty', 'broned', 'selled'],
  })
  status?: 'empty' | 'broned' | 'selled';
}
