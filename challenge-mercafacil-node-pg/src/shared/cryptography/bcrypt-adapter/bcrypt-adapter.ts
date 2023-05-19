import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class BcryptAdapter {
  async hash(password: string) {
    return hashSync(password, 12);
  }

  async comparer(password: string, hash: string) {
    return compareSync(password, hash);
  }
}
