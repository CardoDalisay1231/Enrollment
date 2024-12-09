import request from 'supertest';
import app from '../src/app'; // Assuming your Express app is exported from this file

describe('Registrar Head Routes Tests', () => {
  let registrarToken, deptHeadToken, studentToken;
  let createdRegistrarHeadId, createdRegistrarHeadEmail, createdRegistrarHeadPassword;

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
    student: {
      email: 'stud.stud@cvsu.ph.com',
      password: 'stud',
      role: 'student',
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
    // Authenticate users and retrieve tokens dynamically
    registrarToken = await loginUser(users.registrar.email, users.registrar.password, users.registrar.role);
    deptHeadToken = await loginUser(users.department_head.email, users.department_head.password, users.department_head.role);
    studentToken = await loginUser(users.student.email, users.student.password, users.student.role);
  });

  describe('POST /api/registrarheads', () => {
    it('should allow registrar to create a registrar head', async () => {
      createdRegistrarHeadPassword = '123';

      const newRegistrarHead = {
        first_name: 'John',
        middle_name: 'Doe',
        last_name: 'Smith',
        email: 'john.smith@cvsu.ph.com',
        password: createdRegistrarHeadPassword,
      };

      const res = await request(app)
        .post('/api/registrarheads')
        .send(newRegistrarHead)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(201);
      createdRegistrarHeadId = res.body.data.id;
      createdRegistrarHeadEmail = res.body.data.email;
    });

    it('should return 403 for department_head role trying to create a registrar head', async () => {
      const newRegistrarHead = {
        first_name: 'John',
        middle_name: 'Doe',
        last_name: 'Smith',
        email: 'john.smith@cvsu.ph.com',
        password: '123',
      };

      const res = await request(app)
        .post('/api/registrarheads')
        .send(newRegistrarHead)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/registrarheads', () => {
    it('should allow access to registrar role', async () => {
      const res = await request(app)
        .get('/api/registrarheads')
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for department_head role', async () => {
      const res = await request(app)
        .get('/api/registrarheads')
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
    });

    it('should return 401 for no token provided', async () => {
      const res = await request(app).get('/api/registrarheads');

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/registrarheads/:id', () => {
    it('should allow access to registrar role for specific registrar head', async () => {
      const res = await request(app)
        .get(`/api/registrarheads/${createdRegistrarHeadId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for department_head role accessing a registrar head', async () => {
      const res = await request(app)
        .get(`/api/registrarheads/${createdRegistrarHeadId}`)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe('PUT /api/registrarheads/:id', () => {
    it('should allow registrar to update registrar head information', async () => {
      const updatedData = {
        first_name: 'Jane',
        middle_name: 'Doe',
        last_name: 'Smith',
        email: 'jane.smith@cvsu.ph.com',
        password: '456',
      };

      const res = await request(app)
        .put(`/api/registrarheads/${createdRegistrarHeadId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/registrarheads/:id', () => {
    it('should allow registrar to delete registrar head', async () => {
      const res = await request(app)
        .delete(`/api/registrarheads/${createdRegistrarHeadId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for department_head role trying to delete registrar head', async () => {
      const res = await request(app)
        .delete(`/api/registrarheads/${createdRegistrarHeadId}`)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
    });
  });
});
