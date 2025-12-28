import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Client {
  _id: string;
  name: string;
  email?: string;
}

const API_URL = 'http://localhost:5000/client';

const ClientPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const fetchClients = async () => {
    try {
      const res = await axios.get(API_URL);
      setClients(res.data);
    } catch (err: any) {
      setError('שגיאה בטעינת לקוחות');
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(API_URL, { name, email });
      setName('');
      setEmail('');
      fetchClients();
    } catch (err: any) {
      setError('שגיאה ביצירת לקוח');
    }
  };

  return (
    <div>
      <h2>לקוחות</h2>
      <form onSubmit={handleAddClient} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="שם לקוח"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ marginRight: 8 }}
        />
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">הוספה</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>שם</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>אימייל</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(cli => (
            <tr key={cli._id}>
              <td>{cli.name}</td>
              <td>{cli.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientPage;
