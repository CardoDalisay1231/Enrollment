import { BaseRepository } from './baseRepository.js';
import bcrypt from 'bcrypt';
import Student from '../models/studentModel.js';
import Person from '../models/personModel.js';

export class StudentRepository extends BaseRepository {
  constructor() {
    super('students', Student, 'id'); // Specify students table and primary key as 'id'
    this.personRepo = new BaseRepository('persons', Person, 'id'); // Handle persons with 'id'
  }

  // Hash the password
  async hashPassword(password) {
    return await bcrypt.hash(password, 10); // 10 is the salt rounds
  }

  // Override the create method
  async create(studentData) {
    console.log("this is create Studen repo CREATE")
    const {
      first_name,
      middle_name,
      last_name,
      email,
      password,
      contact_number,
      address,
      date_of_birth,
      student_type,
      standing_year,
      semester,
      program_id,
    } = studentData;

    // Step 1: Hash the password
    const hashedPassword = await this.hashPassword(password);

    // Step 2: Create person
    const person = await this.personRepo.create({
      first_name,
      middle_name,
      last_name,
      email,
      password: hashedPassword,
      contact_number,
      address,
      date_of_birth,
    });

    // Step 3: Create student
    const student = await super.create({
      person_id: person.id, // Link to persons table (person_id to 'id')
      student_type,
      standing_year,
      semester,
      program_id,
    });

    // Return combined data
    return { ...person, ...student };
  }

  // Override the update method
  async update(studentId, studentData) {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      contact_number,
      address,
      date_of_birth,
      student_type,
      standing_year,
      semester,
      password,
      program_id,
    } = studentData;

    // Fetch student to get person_id
    const student = await this.getById(studentId);
    if (!student) throw new Error('Student not found');

    // Step 1: Hash the password if provided
    const hashedPassword = password ? await this.hashPassword(password) : undefined;

    // Step 2: Update person data
    await this.personRepo.update(student.person_id, {
      first_name,
      middle_name,
      last_name,
      email,
      contact_number,
      address,
      date_of_birth,
      ...(hashedPassword && { password: hashedPassword }),
    });

    // Step 3: Update student data
    const dataToUpdate = {
      student_type,
      standing_year,
      semester,
      program_id,
    };

    return super.update(studentId, dataToUpdate);
  }

  async getAll() {
    console.log("get all students triggered");
  
    const query = `
      SELECT s.*, p.first_name, p.middle_name, p.last_name, p.email, p.password, p.contact_number, p.address, p.date_of_birth, 
             pr.program_name
      FROM students s
      JOIN persons p ON s.person_id = p.id  
      JOIN programs pr ON s.program_id = pr.id 
    `;
    
    try {
      const result = await this.getWithJoin(query);
      //console.log("Query result:", result);  // Log the result here
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;  // Rethrow the error to be handled elsewhere
    }
  }
  


  // Retrieve a single student by ID with person data
  async getById(studentId) {
    const query = `
      SELECT s.*, p.first_name, p.middle_name, p.last_name, p.email, p.password, p.contact_number, p.address, p.date_of_birth
      FROM students s
      JOIN persons p ON s.person_id = p.id  -- updated person_id to 'id'
      WHERE s.id = $1  -- updated student_id to 'id'
    `;
    const result = await this.getWithJoin(query, [studentId]);
    return result.length > 0 ? result[0] : null;
  }

  // Delete a student and their associated person
  async delete(studentId) {
    const student = await this.getById(studentId);
    if (!student) throw new Error('Student not found');

    // Step 1: Delete student
    await super.delete(studentId);

    // Step 2: Delete person
    await this.personRepo.delete(student.person_id);

    return student;
  }

  // Verify password
  async verifyPassword(person, plainPassword) {
    return await bcrypt.compare(plainPassword, person.password);
  }
}

export default StudentRepository;
