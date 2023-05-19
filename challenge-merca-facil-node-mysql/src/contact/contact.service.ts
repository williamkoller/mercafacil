import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { AddContactDTO } from './dtos/add-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly repository: Repository<Contact>,
  ) {}

  async addContacts(addContactDTO: AddContactDTO, type: string) {
    const { contacts } = addContactDTO;
    if (type === 'macapa') {
      console.log(contacts);
      await this.repository
        .createQueryBuilder()
        .insert()
        .into(Contact)
        .values(contacts)
        .execute();

      return await this.repository.find();
    }
  }
}
