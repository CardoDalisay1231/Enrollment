import request from 'supertest';
import app from '../src/app'; // Assuming your Express app is exported from this file

describe('Program Routes Tests', () => {
  let registrarToken, deptHeadToken;
  let createdProgramId;

  // User credentials for login
  const users = {
    registrar: {
      email: 'regis.regis@cvsu.ph.com',
      password: 'regis',
      role: 'registrar',
    },
    department_head: {
      email: 'dept.dept@cvsu.ph.com',
      password: 'dept',
      role: 'department_head',
    },
  };

  // Function to log in a user and retrieve their token
  const loginUser = async (email, password, role) => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password, role });

    if (res.status !== 200) {
      throw new Error(`Login failed for ${email} with role ${role}: ${res.body.message}`);
    }

    return res.body.token;
  };

  beforeAll(async () => {
    registrarToken = await loginUser(users.registrar.email, users.registrar.password, users.registrar.role);
    deptHeadToken = await loginUser(users.department_head.email, users.department_head.password, users.department_head.role);
  });

  describe('POST /api/programs', () => {
    it('should allow registrar to create a program', async () => {
      const newProgram = {
        program_name: 'Software Engineering',
      };
      const res = await request(app)
        .post('/api/programs')
        .send(newProgram)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(201);
      createdProgramId = res.body.data.id;
      console.log('Newly created program:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for department_head role trying to create a program', async () => {
      const newProgram = {
        program_name: 'Civil Engineering',
      };

      const res = await request(app)
        .post('/api/programs')
        .send(newProgram)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });

    it('should return 400 if required fields are missing', async () => {
      const newProgram = {
      };

      const res = await request(app)
        .post('/api/programs')
        .send(newProgram)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('program name is required');
    });
  });

  describe('GET /api/programs', () => {
    it('should allow access to registrar to view all programs', async () => {
      const res = await request(app)
        .get('/api/programs')
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should allow access to department_head to view all programs', async () => {
      const res = await request(app)
        .get('/api/programs')
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 401 if no token is provided', async () => {
      const res = await request(app).get('/api/programs');

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized');
    });
  });

  describe('GET /api/programs/:id', () => {
    it('should allow registrar to view a specific program by ID', async () => {
      const res = await request(app)
        .get(`/api/programs/${createdProgramId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(createdProgramId);
    });

    it('should return 404 if the program is not found', async () => {
      const nonExistentProgramId = 999;

      const res = await request(app)
        .get(`/api/programs/${nonExistentProgramId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Program not found');
    });
  });

  describe('PUT /api/programs/:id', () => {
    it('should allow registrar to update program information', async () => {
      const updatedData = {
        program_name: 'Updated Software Engineering',
      };

      const res = await request(app)
        .put(`/api/programs/${createdProgramId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      console.log('Updated program:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for department_head role trying to update a program', async () => {
      const updatedData = {
        program_name: 'Updated Civil Engineering',
      };

      const res = await request(app)
        .put(`/api/programs/${createdProgramId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });
  });

  describe('DELETE /api/programs/:id', () => {
    it('should allow registrar to delete a program', async () => {
      const res = await request(app)
        .delete(`/api/programs/${createdProgramId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for department_head role trying to delete a program', async () => {
      const res = await request(app)
        .delete(`/api/programs/${createdProgramId}`)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });
  });
});
