// 8. pages/checkout.js
import axios from '@/lib/axios';
import { useRouter } from 'next/router';

export default function Checkout() {
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      await axios.post('/checkout');
      alert('Checkout berhasil');
      router.push('/transaksi-saya');
    } catch (err) {
      alert('Checkout gagal');
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Konfirmasi Checkoutpppp</button>
    </div>
  );
}