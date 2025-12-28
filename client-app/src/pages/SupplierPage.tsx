import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Supplier {
  _id: string;
  name: string;
  phone?: string;
}

const API_URL = 'http://localhost:5000/supplier';

const SupplierPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get(API_URL);
      setSuppliers(res.data);
    } catch (err: any) {
      setError('שגיאה בטעינת ספקים');
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(API_URL, { name, phone });
      setName('');
      setPhone('');
      fetchSuppliers();
    } catch (err: any) {
      setError('שגיאה ביצירת ספק');
    }
  };

  return (
    <div>
      <h2>ספקים</h2>
      <form onSubmit={handleAddSupplier} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="שם ספק"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="טלפון"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <button type="submit">הוספה</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>שם</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>טלפון</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(sup => (
            <tr key={sup._id}>
              <td>{sup.name}</td>
              <td>{sup.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierPage;
