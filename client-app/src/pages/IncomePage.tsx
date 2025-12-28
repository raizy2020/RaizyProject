import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Income {
  _id: string;
  amount: number;
  description?: string;
  date: string;
}

const API_URL = 'http://localhost:5000/income';

const IncomePage: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const fetchIncomes = async () => {
    try {
      const res = await axios.get(API_URL);
      setIncomes(res.data);
    } catch (err: any) {
      setError('שגיאה בטעינת הכנסות');
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleAddIncome = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(API_URL, { amount, description, date });
      setAmount(0);
      setDescription('');
      setDate('');
      fetchIncomes();
    } catch (err: any) {
      setError('שגיאה ביצירת הכנסה');
    }
  };

  return (
    <div>
      <h2>הכנסות</h2>
      <form onSubmit={handleAddIncome} style={{ marginBottom: 24 }}>
        <input
          type="number"
          placeholder="סכום"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          required
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="תיאור"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button type="submit">הוספה</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>סכום</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>תיאור</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>תאריך</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map(inc => (
            <tr key={inc._id}>
              <td>{inc.amount}</td>
              <td>{inc.description}</td>
              <td>{inc.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomePage;
