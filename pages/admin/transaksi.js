// 11. pages/admin/transaksi.js
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

export default function AdminTransaksi() {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    axios.get('/transaksi').then(res => setTransaksi(res.data));
  }, []);

  const ubahStatus = (id, status) => {
    axios.put(`/transaksi/${id}/status`, { status }).then(() => {
      setTransaksi(transaksi.map(t => t.id === id ? { ...t, status } : t));
    });
  };

  return (
    <div>
      <h1>Kelola Transaksi</h1>
      <ul>
        {transaksi.map(t => (
          <li key={t.id}>
            Rp{t.total} - Status: {t.status}
            <button onClick={() => ubahStatus(t.id, 'diterima')}>Terima</button>
            <button onClick={() => ubahStatus(t.id, 'ditolak')}>Tolak</button>
          </li>
        ))}
      </ul>
    </div>
  );
}