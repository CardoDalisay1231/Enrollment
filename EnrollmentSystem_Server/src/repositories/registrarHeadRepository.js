// src/repositories/registrarHeadRepository.js
import { BaseRepository } from './baseRepository.js';
import bcrypt from 'bcrypt';
import RegistrarHead from '../models/registrarHeadModel.js';

export class RegistrarHeadRepository extends BaseRepository {
  constructor() {
    super('registrar_heads', RegistrarHead);
  }

  // Hash the password
  async hashPassword(password) {
    return await bcrypt.hash(password, 10); // 10 is the salt rounds
  }

  // Override the create method to hash the password
  async create(registrarHeadData) {
    const { first_name, middle_name, last_name, password } = registrarHeadData;
    const hashedPassword = await this.hashPassword(password);

    return super.create({ first_name, middle_name, last_name, password: hashedPassword });
  }

  // Override the update method to hash the password if it's provided
  async update(id, registrarHeadData) {
    const { first_name, middle_name, last_name, password } = registrarHeadData;

    const hashedPassword = password ? await this.hashPassword(password) : undefined;

    const dataToUpdate = {
      first_name,
      middle_name,
      last_name,
      ...(hashedPassword && { password: hashedPassword })
    };

    return super.update(id, dataToUpdate);
  }

  // Custom method to verify the password
  async verifyPassword(registrarHead, plainPassword) {
    return await bcrypt.compare(plainPassword, registrarHead.password);
  }
}

export default RegistrarHeadRepository;
