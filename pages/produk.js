import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Produk = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/produk', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Gagal mengambil data produk:', error);
        router.push('/');
      }
    };

    fetchProducts();
  }, [router]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Memuat produk...</div>;
  }

  return (
    <>
      <header style={styles.header}>
        <div style={styles.heroContainer}>
          <h1>Discover Your Style</h1>
          <p>Trendy products curated just for you. Shop the latest now!</p>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <img
                src={`http://localhost:8000/storage/produk/${product.gambar}`}
                alt={product.nama}
                style={styles.productImage}
              />
              <div style={styles.productInfo}>
                <h3 style={styles.productName}>{product.nama}</h3>
                <p style={styles.productPrice}>Rp {Number(product.harga).toLocaleString()}</p>
                <button style={styles.button}>Add to Cart</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

const styles = {
  header: {
    backgroundColor: '#444',
    color: '#fff',
    padding: '4rem 1.5rem',
    textAlign: 'center',
  },
  heroContainer: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  main: {
    padding: '3rem 1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '2rem',
  },
  productCard: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  productImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  productInfo: {
    padding: '1rem 1.2rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productName: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#333',
  },
  productPrice: {
    fontWeight: '700',
    color: '#333',
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#444',
    border: 'none',
    padding: '0.5rem',
    fontWeight: '600',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Produk;
