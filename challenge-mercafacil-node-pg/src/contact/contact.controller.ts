import { Controller, Post, Body, Param } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post(':type')
  async create(
    @Body() createContactDto: CreateContactDto,
    @Param('type') type: string,
  ) {
    return await this.contactService.create(createContactDto, type);
  }
}
