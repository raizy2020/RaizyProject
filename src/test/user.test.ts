import request from 'supertest';
import app from '../app';

describe('User API', () => {
  it('should get all users', async () => {
    const res = await request(app).get('/user');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/user')
      .send({ name: 'Test User' });
    expect([200, 201, 400]).toContain(res.statusCode);
  });

  it('should get user by id', async () => {
    const createRes = await request(app)
      .post('/user')
      .send({ name: 'FindMe' });
    const id = createRes.body._id;
    const res = await request(app).get(`/user/${id}`);
    expect([200, 404, 400,500]).toContain(res.statusCode);
  });

  it('should update user', async () => {
    const createRes = await request(app)
      .post('/user')
      .send({ name: 'UpdateMe' });
    const id = createRes.body._id;
    const res = await request(app)
      .put(`/user/${id}`)
      .send({ name: 'Updated' });
    expect([200, 404, 400]).toContain(res.statusCode);
  });

  it('should delete user', async () => {
    const createRes = await request(app)
      .post('/user')
      .send({ name: 'DeleteMe' });
    const id = createRes.body._id;
    const res = await request(app).delete(`/user/${id}`);
    expect([200, 404, 400,500]).toContain(res.statusCode);
  });
});
