import { BaseRepository } from './baseRepository.js';
import bcrypt from 'bcrypt';
import DepartmentHead from '../models/departmentHeadModel.js';

export class DepartmentHeadRepository extends BaseRepository {
  constructor() {
    super('department_heads', DepartmentHead);
  }

  // Hash the password
  async hashPassword(password) {
    return await bcrypt.hash(password, 10); // 10 is the salt rounds
  }

  // Override the create method to hash the password and include program_id
  async create(departmentHeadData) {
    const { first_name, middle_name, last_name, password, program_id } = departmentHeadData;
    const hashedPassword = await this.hashPassword(password);

    return super.create({
      first_name,
      middle_name,
      last_name,
      password: hashedPassword,
      program_id, // Include program_id in creation
    });
  }

  // Override the update method to hash the password if it's provided and update program_id
  async update(id, departmentHeadData) {
    const { first_name, middle_name, last_name, password, program_id } = departmentHeadData;

    const hashedPassword = password ? await this.hashPassword(password) : undefined;

    const dataToUpdate = {
      first_name,
      middle_name,
      last_name,
      ...(hashedPassword && { password: hashedPassword }),
      ...(program_id && { program_id }) // Update program_id if provided
    };

    return super.update(id, dataToUpdate);
  }

  // Retrieve all department heads
  async getAll() {
    return super.getAll();
  }

  // Retrieve a department head by ID
  async getById(id) {
    return super.getById(id);
  }

  // Delete a department head by ID
  async delete(id) {
    return super.delete(id);
  }

  // Custom method to verify the password
  async verifyPassword(departmentHead, plainPassword) {
    return await bcrypt.compare(plainPassword, departmentHead.password);
  }
}

export default DepartmentHeadRepository;
