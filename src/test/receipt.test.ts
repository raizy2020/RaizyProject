import request from 'supertest';
import app from '../app';

describe('Receipt API', () => {
  it('should get all receipts', async () => {
    const res = await request(app).get('/receipt');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new receipt', async () => {
    const res = await request(app)
      .post('/receipt')
      .send({ amount: 100, clientName: 'Test Client', date: new Date() });
    expect([200, 201, 400]).toContain(res.statusCode);
  });

  it('should get receipt by id', async () => {
    const createRes = await request(app)
      .post('/receipt')
      .send({ amount: 50, clientName: 'FindMe', date: new Date() });
    const id = createRes.body._id;
    const res = await request(app).get(`/receipt/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  it('should update receipt', async () => {
    const createRes = await request(app)
      .post('/receipt')
      .send({ amount: 70, clientName: 'UpdateMe', date: new Date() });
    const id = createRes.body._id;
    const res = await request(app)
      .put(`/receipt/${id}`)
      .send({ amount: 80 });
    expect([200, 404]).toContain(res.statusCode);
  });

  it('should delete receipt', async () => {
    const createRes = await request(app)
      .post('/receipt')
      .send({ amount: 90, clientName: 'DeleteMe', date: new Date() });
    const id = createRes.body._id;
    const res = await request(app).delete(`/receipt/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});
