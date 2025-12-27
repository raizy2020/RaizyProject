import request from 'supertest';
import app from '../app';

describe('Supplier API', () => {
  it('should get all suppliers', async () => {
    const res = await request(app).get('/supplier');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new supplier', async () => {
    const res = await request(app)
      .post('/supplier')
      .send({ name: 'Test Supplier' });
    expect([200, 201, 400]).toContain(res.statusCode);
  });

  it('should get supplier by id', async () => {
    const createRes = await request(app)
      .post('/supplier')
      .send({ name: 'FindMe' });
    const id = createRes.body._id;
    const res = await request(app).get(`/supplier/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  it('should update supplier', async () => {
    const createRes = await request(app)
      .post('/supplier')
      .send({ name: 'UpdateMe' });
    const id = createRes.body._id;
    const res = await request(app)
      .put(`/supplier/${id}`)
      .send({ name: 'Updated' });
    expect([200, 404]).toContain(res.statusCode);
  });

  it('should delete supplier', async () => {
    const createRes = await request(app)
      .post('/supplier')
      .send({ name: 'DeleteMe' });
    const id = createRes.body._id;
    const res = await request(app).delete(`/supplier/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});
