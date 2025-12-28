import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
  description?: string;
}

const API_URL = 'http://localhost:5000/category'; // עדכני כתובת אם צריך

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (err: any) {
      setError('שגיאה בטעינת קטגוריות');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(API_URL, { name, description });
      setName('');
      setDescription('');
      fetchCategories();
    } catch (err: any) {
      setError('שגיאה ביצירת קטגוריה');
    }
  };

  return (
    <div>
      <h2>קטגוריות</h2>
      <form onSubmit={handleAddCategory} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="שם קטגוריה"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="תיאור"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">הוספה</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>שם</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>תיאור</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryPage;
