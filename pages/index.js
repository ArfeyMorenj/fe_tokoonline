import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const styles = {
  container: {
    width: '400px',
    margin: '50px auto',
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    borderRadius: '10px',
    overflow: 'hidden',
    background: '#fff',
  },
  header: {
    padding: '20px',
    background: '#4f46e5',
    color: '#fff',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '600',
  },
  form: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '15px',
  },
  toggle: {
    textAlign: 'center',
    marginTop: '10px',
    color: '#4f46e5',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline',
  },
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kata_sandi: '',
    telepon: '',
    alamat: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.kata_sandi) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email: formData.email,
        kata_sandi: formData.kata_sandi,
      });

      localStorage.setItem('token', res.data.token);
      router.push('/produk');
    } catch (err) {
      setError(err.response?.data?.error || 'Login gagal. Periksa email dan kata sandi.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nama || !formData.email || !formData.kata_sandi) {
      setError('Nama, email, dan kata sandi wajib diisi.');
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/register', {
        nama: formData.nama,
        email: formData.email,
        kata_sandi: formData.kata_sandi,
        telepon: formData.telepon,
        alamat: formData.alamat,
      });

      localStorage.setItem('token', res.data.token);
      router.push('/produk');
    } catch (err) {
      setError(err.response?.data?.message || 'Pendaftaran gagal. Periksa data yang dimasukkan.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      nama: '',
      email: '',
      kata_sandi: '',
      telepon: '',
      alamat: '',
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>{isLogin ? 'Login' : 'Register'}</div>
      <form onSubmit={isLogin ? handleLogin : handleRegister} style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}
        {!isLogin && (
          <>
            <label style={styles.label}>Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Masukkan nama"
            />
          </>
        )}
        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="contoh@email.com"
        />
        <label style={styles.label}>Kata Sandi</label>
        <input
          type="password"
          name="kata_sandi"
          value={formData.kata_sandi}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="••••••••"
        />
        {!isLogin && (
          <>
            <label style={styles.label}>Telepon</label>
            <input
              type="text"
              name="telepon"
              value={formData.telepon}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Masukkan nomor telepon"
            />
            <label style={styles.label}>Alamat</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Masukkan alamat"
            />
          </>
        )}
        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Register'}
        </button>
        <div style={styles.toggle} onClick={toggleForm}>
          {isLogin ? 'Belum punya akun? Register' : 'Sudah punya akun? Login'}
        </div>
      </form>
    </div>
  );
}