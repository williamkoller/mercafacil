import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':type')
  async create(
    @Body() createContactDto: CreateContactDto,
    @Param('type') type: string,
  ) {
    return await this.contactService.create(createContactDto, type);
  }
}
