// 5. pages/register.js
import { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ nama: '', email: '', kata_sandi: '', telepon: '', alamat: '' });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      alert('Pendaftaran berhasil');
      router.push('/login');
    } catch (err) {
      alert('Gagal mendaftar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nama" onChange={handleChange} placeholder="Nama" required />
      <input name="email" onChange={handleChange} placeholder="Email" required />
      <input name="kata_sandi" onChange={handleChange} type="password" placeholder="Kata Sandi" required />
      <input name="telepon" onChange={handleChange} placeholder="Telepon" />
      <textarea name="alamat" onChange={handleChange} placeholder="Alamat" />
      <button type="submit">Daftar</button>
    </form>
  );
}