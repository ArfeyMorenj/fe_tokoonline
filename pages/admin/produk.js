// 10. pages/admin/produk.js
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

export default function AdminProduk() {
  const [produk, setProduk] = useState([]);
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');

  const fetchProduk = () => {
    axios.get('/produk').then(res => setProduk(res.data));
  };

  useEffect(() => { fetchProduk(); }, []);

  const tambahProduk = async () => {
    await axios.post('/produk', { nama, harga });
    fetchProduk();
  };

  return (
    <div>
      <h1>Kelola Produk</h1>
      <input value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama" />
      <input value={harga} onChange={e => setHarga(e.target.value)} placeholder="Harga" />
      <button onClick={tambahProduk}>Tambah</button>

      <ul>
        {produk.map(p => (
          <li key={p.id}>{p.nama} - Rp{p.harga}</li>
        ))}
      </ul>
    </div>
  );
}