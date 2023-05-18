import { Body, Controller, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { AddContactDTO } from './dtos/add-contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post(':type')
  async add(@Body() data: AddContactDTO, @Param('type') type: string) {
    return await this.contactService.addContacts(data, type);
  }
}
