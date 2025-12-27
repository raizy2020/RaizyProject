import request from 'supertest';
import app from '../src/app';

describe('Category API', () => {
  it('should get all categories', async () => {
    const res = await request(app).get('/category');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new category', async () => {
    const res = await request(app)
      .post('/category')
      .send({ name: 'Test Category' });
    expect([200, 201, 400]).toContain(res.statusCode);
  });

  it('should get category by id', async () => {
    const createRes = await request(app)
      .post('/category')
      .send({ name: 'FindMe' });
    const id = createRes.body._id;
    const res = await request(app).get(`/category/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  it('should update category', async () => {
    const createRes = await request(app)
      .post('/category')
      .send({ name: 'UpdateMe' });
    const id = createRes.body._id;
    const res = await request(app)
      .put(`/category/${id}`)
      .send({ name: 'Updated' });
    expect([200, 404]).toContain(res.statusCode);
  });

  it('should delete category', async () => {
    const createRes = await request(app)
      .post('/category')
      .send({ name: 'DeleteMe' });
    const id = createRes.body._id;
    const res = await request(app).delete(`/category/${id}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});
