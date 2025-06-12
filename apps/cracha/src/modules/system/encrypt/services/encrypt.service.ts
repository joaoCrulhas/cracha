import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  private readonly salt: number;
  constructor() {
    this.salt = 10;
  }
  async encrypt(text: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.salt);
      return await bcrypt.hash(text, salt);
    } catch (err) {
      console.error('Encryption failed:', err);
      throw err;
    }
  }

  async compare(text: string, hashed: string): Promise<boolean> {
    try {
      return await bcrypt.compare(text, hashed);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
