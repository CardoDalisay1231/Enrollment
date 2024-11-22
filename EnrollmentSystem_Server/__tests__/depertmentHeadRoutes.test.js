import request from 'supertest';
import app, { server } from '../src/app';  // Import the server as well
import { query } from '../src/config/dbConfig'; // or wherever your database connection is located
import bcrypt from 'bcryptjs';  // Import bcrypt for password comparison
import DepartmentHeadService from '../src/services/departmentHeadService';

describe('DepartmentHead Routes', () => {

  let createdDepartmentHeadId;
  let createdDepartmentHeadPassword; // Variable to store the hashed password for validation

  it('should create a new department head with password', async () => {
    const departmentHeadData = {
      first_name: 'Alice',
      middle_name: 'Joy',
      last_name: 'Williams',
      password: 'TestPassword123'
    };
  
    const res = await request(app)
      .post('/api/department-heads')
      .send(departmentHeadData);
  
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    createdDepartmentHeadId = res.body.data.id;
    createdDepartmentHeadPassword = res.body.data.password; // Store the hashed password for later comparison
  
    expect(res.body.data.first_name).toBe(departmentHeadData.first_name);
    expect(res.body.data.last_name).toBe(departmentHeadData.last_name);
    
    // Check if the email matches the auto-generated format
    const expectedEmail = `${departmentHeadData.first_name.toLowerCase()}.${departmentHeadData.last_name.toLowerCase()}@cvsu.ph.com`;
    expect(res.body.data.email).toBe(expectedEmail);
  });
  

  it('should validate that password is hashed correctly', async () => {
    // Retrieve the department head from the database to check password
    const res = await query('SELECT password FROM department_heads WHERE id = $1', [createdDepartmentHeadId]);

    // Use bcrypt to compare the stored hashed password with the plain text password
    const isPasswordValid = await bcrypt.compare('TestPassword123', res.rows[0].password);

    expect(isPasswordValid).toBe(true); // Check that the password matches
  });

  test('should not create a department head with missing required fields', async () => {
    const requiredFields = ['first_name', 'last_name', 'password'];
  
    for (let field of requiredFields) {
      // Create departmentHeadData with the current field missing
      const departmentHeadData = {
        first_name: 'John',
        last_name: 'Doe',
        password: 'Password123', // Default valid password
        // Remove the current field from the data
        [field]: undefined
      };
  
      const res = await request(app)
        .post('/api/department-heads') // Ensure the correct endpoint is used
        .send(departmentHeadData);
  
      expect(res.status).toBe(400); // Expecting 400 Bad Request
      expect(res.body.error).toContain(`${field.replace('_', ' ')} is required`);
    }
  }, 10000); // Increased timeout
  
  


  it('should get all department heads', async () => {
    const res = await request(app).get('/api/department-heads');

    // Assert the response has the correct status and the expected list of department heads
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);  // Ensure the response is an array

    // Check that the response contains at least one department head (since we created one before)
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0]).toHaveProperty('id');
    expect(res.body.data[0].first_name).toBe('Alice');
    expect(res.body.data[0].last_name).toBe('Williams');
  });

  it('should get a department head by ID', async () => {
    const res = await request(app).get(`/api/department-heads/${createdDepartmentHeadId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(createdDepartmentHeadId);
  });

  it('should return 404 if department head not found by ID', async () => {
    const res = await request(app).get('/api/department-heads/999999');  // Non-existent department head ID
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Department Head not found');
  });

  it('should update a department head by ID', async () => {
    const updatedData = {
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice.johnson@cvsu.ph.com',
      password: 'TestPassword123456'
    };

    const res = await request(app)
      .put(`/api/department-heads/${createdDepartmentHeadId}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.data.first_name).toBe(updatedData.first_name);
    expect(res.body.data.last_name).toBe(updatedData.last_name);
  }, 10000);  // Increased timeout to 10 seconds

  it('should return 404 when updating a non-existent department head', async () => {
    const updatedData = {
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice.johnson@cvsu.ph.com',
      password: 'TestPassword123456'
    };

    const res = await request(app)
      .put('/api/department-heads/999999')  // Non-existent department head ID
      .send(updatedData);

    expect(res.status).toBe(404);  // Expect 404 status
    expect(res.body.error).toBe('Department Head not found');  // Expect the correct error message
  }, 10000);

  it('should delete a department head by ID', async () => {
    const res = await request(app).delete(`/api/department-heads/${createdDepartmentHeadId}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('id', createdDepartmentHeadId);
  });

  it('should return 404 when deleting a non-existent department head', async () => {
    const res = await request(app).delete('/api/department-heads/999999');  // Non-existent department head ID
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Department Head not found');
  }, 10000);  // Increased timeout

  it('should return 404 when the department head is not found', async () => {
    // Mock the getDepartmentHeadById method to return null (department head not found)
    DepartmentHeadService.getDepartmentHeadById = jest.fn().mockResolvedValue(null);

    const res = await request(app).get('/api/department-heads/99999');  // Non-existent department head ID

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Department Head not found');
  });

  it('should return 404 when deleting a non-existent department head', async () => {
    // Mock the deleteDepartmentHead method to return null (department head not found)
    DepartmentHeadService.deleteDepartmentHead = jest.fn().mockResolvedValue(null);

    const res = await request(app).delete('/api/department-heads/99999');  // Non-existent department head ID

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Department Head not found');
  });

  it('should return 500 when there is an error fetching all department heads', async () => {
    // Mock the getAllDepartmentHeads method to throw an error
    jest.spyOn(DepartmentHeadService.prototype, 'getAllDepartmentHeads').mockRejectedValue(new Error('Database connection failed'));

    // Make the request to fetch all department heads
    const res = await request(app).get('/api/department-heads');

    // Assert the error response
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Error Fetching Department Heads');
  });

  // Cleanup after all tests
  afterAll(async () => {
    // Clean up the department head data
    await query('DELETE FROM department_heads WHERE id = $1', [createdDepartmentHeadId]);

    // Close the server instance explicitly after tests
    server.close();
  });
});