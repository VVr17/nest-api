import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Request,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsMyPetGuard } from './guards/isMyPet.guard';
import { Pet } from './schemas/pet.schema';

@ApiTags('Pets') // Swagger tag for API
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiCreatedResponse({
    description: 'The pet has been successfully created.',
    type: Pet,
  })
  @Post()
  create(
    @Body() createPetDto: CreatePetDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.petsService.create(createPetDto, req.user._id);
  }

  @ApiOkResponse({
    description: 'The pet has been successfully updated.',
    type: Pet,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(IsMyPetGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @ApiOkResponse({
    description: 'The pet has been successfully removed.',
    type: Pet,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(IsMyPetGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
