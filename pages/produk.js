import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function HomePage() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
      return;
    }

    axios
      .get('http://127.0.0.1:8000/api/produk', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProduk(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gagal mengambil produk:', err);
        setError('Gagal memuat produk. Silakan coba lagi atau login ulang.');
        setLoading(false);
      });
  }, [router]);

  const addToCart = async (produkId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/keranjang',
        { produk_id: produkId, jumlah: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Produk berhasil ditambahkan ke keranjang!');
    } catch (err) {
      console.error('Gagal menambah ke keranjang:', err);
      alert('Gagal menambah ke keranjang. Pastikan stok tersedia.');
    }
  };

  if (loading) {
    return <div className="text-center mt-12 text-gray-600">Memuat produk...</div>;
  }

  if (error) {
    return <div className="text-center mt-12 text-red-500">{error}</div>;
  }

  const featuredProduct = produk.length > 0 ? produk[0] : null;

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <div className="nav">
        <div className="logo">Kick Avenue</div>
        <div className="nav-links">
          <button onClick={() => router.push('/produk')}>Produkkk</button>
          <button onClick={() => router.push('/keranjang')}>Keranjang</button>
          <button onClick={() => router.push('/checkout')}>Checkout</button>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/');
          }}
          className="logout-btn"
        >
          Logout
        </button>
      </div>

      {/* Banner Produk Unggulan */}
      {featuredProduct && (
        <div className="featured-banner">
          <h1>{featuredProduct.nama}</h1>
          <div className="image-container">
            <img
              src={
                featuredProduct.gambar
                  ? `http://127.0.0.1:8000/storage/produk/${featuredProduct.gambar}`
                  : 'https://via.placeholder.com/300x200'
              }
              alt={featuredProduct.nama}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200';
              }}
            />
            <img
              src={
                featuredProduct.gambar
                  ? `http://127.0.0.1:8000/storage/produk/${featuredProduct.gambar}`
                  : 'https://via.placeholder.com/300x200'
              }
              alt={featuredProduct.nama}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200';
              }}
            />
          </div>
        </div>
      )}

      {/* Bagian Produk Trending */}
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Trending</h2>
          <button
            onClick={() => router.push('/produk')}
            className="text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {produk.map((item) => (
            <div key={item.id} className="product-card">
              <img
                src={
                  item.gambar
                    ? `http://127.0.0.1:8000/storage/produk/${item.gambar}`
                    : 'https://via.placeholder.com/200x150'
                }
                alt={item.nama}
                className="w-full h-48 object-cover rounded"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x150';
                }}
              />
              <div className="mt-2">
                <h3>{item.nama}</h3>
                <p className="price">Rp {Number(item.harga).toLocaleString()}</p>
                <p className="stock">Stok: {item.stok}</p>
                <button onClick={() => addToCart(item.id)} className="add-to-cart-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}