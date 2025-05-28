// 7. pages/keranjang.js
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

export default function Keranjang() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/keranjang').then(res => setItems(res.data));
  }, []);

  const hapusItem = (id) => {
    axios.delete(`/keranjang/${id}`).then(() => setItems(items.filter(i => i.id !== id)));
  };

  return (
    <div>
      <h1>Keranjang Saya</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.produk?.nama} - {item.jumlah}
            <button onClick={() => hapusItem(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}