// 4. pages/login.js
import { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [kataSandi, setKataSandi] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, kata_sandi: kataSandi });
      localStorage.setItem('token', res.data.token);
      router.push('/produk');
    } catch (err) {
      alert('Login gagal');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input value={kataSandi} onChange={e => setKataSandi(e.target.value)} type="password" placeholder="Kata Sandi" required />
      <button type="submit">Login</button>
    </form>
  );
}
