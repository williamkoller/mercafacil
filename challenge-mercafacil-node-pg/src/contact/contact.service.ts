import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly repository: Repository<Contact>,
    private readonly http: HttpService,
  ) {}
  async create(createContactDto: CreateContactDto, type: string) {
    const { contacts } = createContactDto;
    if (type === 'varejao') {
      await this.repository
        .createQueryBuilder()
        .insert()
        .into(Contact)
        .values(contacts)
        .execute();
    } else if (type === 'macapa') {
      try {
        await this.http.axiosRef.post(
          'https://2f99-2804-14c-87b0-88e2-d9cf-3330-5ada-4a2f.sa.ngrok.io/contacts/macapa',
          { contacts },
        );
      } catch (error) {
        console.log(error);
      }
    }

    return await this.repository.find();
  }
}
