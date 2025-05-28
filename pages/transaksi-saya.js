// 9. pages/transaksi-saya.js
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

export default function TransaksiSaya() {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    axios.get('/transaksi/saya').then(res => setTransaksi(res.data));
  }, []);

  return (
    <div>
      <h1>Transaksi Saya</h1>
      <ul>
        {transaksi.map(t => (
          <li key={t.id}>
            Total: Rp{t.total}, Status: {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}