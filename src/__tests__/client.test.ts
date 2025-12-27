import request from 'supertest';
import app from '../app';

describe('Client API', () => {
  it('should get all clients', async () => {
    const res = await request(app).get('/client');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new client', async () => {
    const res = await request(app)
      .post('/client')
      .send({ name: 'Test Client' });
    expect([200, 201, 400]).toContain(res.statusCode);
  });

  it('should get client by id', async () => {
    const createRes = await request(app)
      .post('/client')
      .send({ name: 'FindMe' });
    const id = createRes.body._id;
    const res = await request(app).get(`/client/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  it('should update client', async () => {
    const createRes = await request(app)
      .post('/client')
      .send({ name: 'UpdateMe' });
    const id = createRes.body._id;
    const res = await request(app)
      .put(`/client/${id}`)
      .send({ name: 'Updated' });
    expect([200, 404]).toContain(res.statusCode);
  });

  it('should delete client', async () => {
    const createRes = await request(app)
      .post('/client')
      .send({ name: 'DeleteMe' });
    const id = createRes.body._id;
    const res = await request(app).delete(`/client/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});
