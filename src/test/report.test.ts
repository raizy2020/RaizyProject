import request from 'supertest';
import app from '../app';

describe('Report API', () => {
  it('should get income vs expense report', async () => {
    const res = await request(app).get('/report/income-vs-expense');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('incomes');
    expect(res.body).toHaveProperty('expenses');
  });

  it('should get income by client', async () => {
    const res = await request(app).get('/report/income-by-client/123456789012');
    expect([200, 404]).toContain(res.statusCode);
  });

  it('should get income by date', async () => {
    const res = await request(app).get('/report/income-by-date?from=2020-01-01&to=2030-01-01');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get expense by category', async () => {
    const res = await request(app).get('/report/expense-by-category/123456789012');
    expect([200, 404]).toContain(res.statusCode);
  });

  it('should get expense by date', async () => {
    const res = await request(app).get('/report/expense-by-date?from=2020-01-01&to=2030-01-01');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
