import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Expense {
  _id: string;
  amount: number;
  description?: string;
  date: string;
}

const API_URL = 'http://localhost:5000/expense';

const ExpensePage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API_URL);
      setExpenses(res.data);
    } catch (err: any) {
      setError('שגיאה בטעינת הוצאות');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(API_URL, { amount, description, date });
      setAmount(0);
      setDescription('');
      setDate('');
      fetchExpenses();
    } catch (err: any) {
      setError('שגיאה ביצירת הוצאה');
    }
  };

  return (
    <div>
      <h2>הוצאות</h2>
      <form onSubmit={handleAddExpense} style={{ marginBottom: 24 }}>
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
          {expenses.map(exp => (
            <tr key={exp._id}>
              <td>{exp.amount}</td>
              <td>{exp.description}</td>
              <td>{exp.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensePage;
