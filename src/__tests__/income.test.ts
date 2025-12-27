import request from 'supertest';
import app from '../app';

describe('Income API', () => {
  it('should create a new income', async () => {
    const res = await request(app)
      .post('/income')
      .send({
        receiptNumber: '123',
        date: new Date(),
        client: '613b1c4f1c4ae1a1a1a1a1a1',
        amount: 1000,
        vat: 0,
        paymentType: 'cash'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });
});
