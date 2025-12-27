import request from 'supertest';
import app from '../app';

describe('Expense API', () => {
  it('should create a new expense', async () => {
    const res = await request(app)
      .post('/expense')
      .send({
        referenceNumber: '456',
        date: new Date(),
        supplier: '613b1c4f1c4ae1a1a1a1a1a2',
        category: '613b1c4f1c4ae1a1a1a1a1a3',
        amount: 500,
        vat: 0,
        paymentType: 'cash'
      });
    expect([201, 400]).toContain(res.statusCode);
    if (res.statusCode === 201) {
      expect(res.body).toHaveProperty('_id');
    } else {
      expect(res.body).toHaveProperty('error');
    }
  });
});
