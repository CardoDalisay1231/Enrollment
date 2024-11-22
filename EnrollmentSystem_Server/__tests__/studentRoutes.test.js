import request from 'supertest';
import app, { server } from '../src/app';  // Import the server as well
import { query } from '../src/config/dbConfig'; // or wherever your database connection is located
import bcrypt from 'bcryptjs';  // Import bcrypt for password comparison
import StudentService from '../src/services/studentService';

describe('Student Routes', () => {

  let createdStudentId;
  let createdStudentPassword; // Variable to store the hashed password for validation

  it('should create a new student with password', async () => {
    const studentData = {
      first_name: 'John',
      middle_name: 'Michael',
      last_name: 'Smith',
      contact_number: '123-456-7890',
      address: '123 Main St',
      date_of_birth: '2000-01-01',
      student_type: 'regular',
      standing_year: 2,
      semester: '1st',
      password: 'TestPassword123' // Password field added here
    };

    const res = await request(app)
      .post('/api/students')
      .send(studentData);
    
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('student_id');
    createdStudentId = res.body.data.student_id;
    createdStudentPassword = res.body.data.password; // Store the hashed password for later comparison

    expect(res.body.data.first_name).toBe(studentData.first_name);
    expect(res.body.data.last_name).toBe(studentData.last_name);
    expect(res.body.data.email).toMatch(
      new RegExp(`${studentData.first_name.toLowerCase()}.${studentData.last_name.toLowerCase()}\\d?@cvsu.ph.com`)
    );
  });

  it('should validate that password is hashed correctly', async () => {
    // Retrieve the student from the database to check password
    const res = await query('SELECT password FROM students WHERE student_id = $1', [createdStudentId]);
    
    // Use bcrypt to compare the stored hashed password with the plain text password
    const isPasswordValid = await bcrypt.compare('TestPassword123', res.rows[0].password);
    
    expect(isPasswordValid).toBe(true); // Check that the password matches
  });

 it('should not create a student with missing required fields', async () => {
  const requiredFields = [
    'first_name', 'last_name', 'contact_number', 'address', 'date_of_birth', 
    'student_type', 'standing_year', 'semester', 'password'
  ];

  for (let field of requiredFields) {
    // Create studentData with the current field missing
    const studentData = {
      first_name: 'test',
      last_name: 'test',
      contact_number: '123-456-7890',
      address: '123 Main St',
      date_of_birth: '2000-01-01',
      student_type: 'regular',
      standing_year: 2,
      semester: '1st',
      password: 'TestPassword123', // Default valid password
      // Remove the current field from the data
      [field]: undefined
    };

    const res = await request(app)
      .post('/api/students')
      .send(studentData);

    expect(res.status).toBe(400);
    expect(res.body.error).toContain(`${field.replace('_', ' ')} is required`);
  }
}, 10000); // Increased timeout


  it('should get all students', async () => {
    const res = await request(app).get('/api/students');
    
    // Assert the response has the correct status and the expected list of students
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);  // Ensure the response is an array

    // Check that the response contains at least one student (since we created one before)
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0]).toHaveProperty('student_id');
    expect(res.body.data[0].first_name).toBe('John');
    expect(res.body.data[0].last_name).toBe('Smith');
  });


  it('should get a student by ID', async () => {
    const res = await request(app).get(`/api/students/${createdStudentId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.student_id).toBe(createdStudentId);
  });

  it('should return 404 if student not found by ID', async () => {
    const res = await request(app).get('/api/students/999999');  // Non-existent student ID
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Student not found');
  });

  it('should update a student by ID', async () => {
    const updatedData = {
      first_name: 'John',
      last_name: 'Doe',
      student_type: 'regular',
      date_of_birth: '2000-01-01',
      standing_year: 3,
      semester: '2nd',
      password: 'TestPassword123456'
    };

    const res = await request(app)
      .put(`/api/students/${createdStudentId}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.data.first_name).toBe(updatedData.first_name);
    expect(res.body.data.last_name).toBe(updatedData.last_name);
    expect(res.body.data.student_type).toBe(updatedData.student_type);
  }, 10000);  // Increased timeout to 10 seconds

  it('should return 404 when updating a non-existent student', async () => {
    const updatedData = {
      first_name: 'John',
      last_name: 'Doe',
      student_type: 'regular',
      date_of_birth: '2000-01-01',
      standing_year: 3,
      semester: '2nd', 
      password: 'TTestPassword123456'
      };
  
    const res = await request(app)
      .put('/api/students/999999')  // Non-existent student ID
      .send(updatedData);
  
    expect(res.status).toBe(404);  // Expect 404 status
    expect(res.body.error).toBe('Student not found');  // Expect the correct error message
  }, 10000);
  

  it('should delete a student by ID', async () => {
    const res = await request(app).delete(`/api/students/${createdStudentId}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('student_id', createdStudentId);
  });

  it('should return 404 when deleting a non-existent student', async () => {
    const res = await request(app).delete('/api/students/999999');  // Non-existent student ID
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Student not found');
  }, 10000);  // Increased timeout


  


  it('should return 404 when the student is not found', async () => {
    // Mock the getStudentById method to return null (student not found)
    StudentService.getStudentById = jest.fn().mockResolvedValue(null);
    
    const res = await request(app).get('/api/students/99999');  // Non-existent student ID
    
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Student not found');
  });

  it('should return 404 when deleting a non-existent student', async () => {
    // Mock the deleteStudent method to return null (student not found)
    StudentService.deleteStudent = jest.fn().mockResolvedValue(null);
    
    const res = await request(app).delete('/api/students/99999');  // Non-existent student ID
    
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Student not found');
  });


  it('should return 500 when there is an error fetching all students', async () => {
    // Mock the getAllStudents method to throw an error
    jest.spyOn(StudentService.prototype, 'getAllStudents').mockRejectedValue(new Error('Database connection failed'));
  
    // Make the request to fetch all students
    const res = await request(app).get('/api/students');
    
    // Assert the error response
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Error Fetching Students');
  });
  
  // Cleanup after all tests
  afterAll(async () => {
    // Clean up the student data
    await query('DELETE FROM students WHERE student_id = $1', [createdStudentId]);

    // Close the server instance explicitly after tests
    server.close();
  });

});
