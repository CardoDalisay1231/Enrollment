import { BaseRepository } from './baseRepository.js';
import bcrypt from 'bcrypt';
import Student from '../models/studentModel.js';

export class StudentRepository extends BaseRepository {
  constructor() {
    super('students', Student);
  }

  // Hash the password
  async hashPassword(password) {
    return await bcrypt.hash(password, 10); // 10 is the salt rounds
  }

  // Override the create method to hash the password
  async create(studentData) {
    const {
      first_name,
      middle_name,
      last_name,
      contact_number,
      address,
      date_of_birth,
      student_type,
      standing_year,
      semester,
      password,
      program_id, // Include program_id
    } = studentData;

    const hashedPassword = await this.hashPassword(password);

    return super.create({
      first_name,
      middle_name,
      last_name,
      contact_number,
      address,
      date_of_birth,
      student_type,
      standing_year,
      semester,
      password: hashedPassword,
      program_id, // Pass program_id to the database
    });
  }

  // Override the update method to hash the password if it's provided
  async update(id, studentData) {
    const {
      first_name,
      middle_name,
      last_name,
      contact_number,
      address,
      date_of_birth,
      student_type,
      standing_year,
      semester,
      password,
      program_id, // Include program_id
    } = studentData;

    const hashedPassword = password ? await this.hashPassword(password) : undefined;

    const dataToUpdate = {
      first_name,
      middle_name,
      last_name,
      contact_number,
      address,
      date_of_birth,
      student_type,
      standing_year,
      semester,
      ...(hashedPassword && { password: hashedPassword }),
      ...(program_id && { program_id }), // Update program_id if provided
    };

    return super.update(id, dataToUpdate);
  }

  // Retrieve all students
  async getAll() {
    return super.getAll();
  }

  // Retrieve a student by ID
  async getById(id) {
    return super.getById(id);
  }

  // Delete a student
  async delete(id) {
    return super.delete(id);
  }

  // Custom method to verify the password
  async verifyPassword(student, plainPassword) {
    return await bcrypt.compare(plainPassword, student.password);
  }
}

export default StudentRepository;
