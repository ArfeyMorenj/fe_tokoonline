import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <div className="brand">ShopEase</div>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/keranjang">Cart</Link></li>
          <li><Link href="/tranksaksi_saya">My Transactions</Link></li>
          <li><Link href="/admin.produk">Admin</Link></li>
        </ul>
        <div className="nav-icons">
          <button aria-label="Search" className="icon-button">🔍</button>
          <button aria-label="Shopping Cart" className="icon-button">🛒</button>
        </div>
      </div>


      <style jsx>{`
        nav {
          background-color: #333; /* Dark Gray */
          padding: 1rem 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          font-weight: 700;
          font-size: 1.5rem;
          color: #ffffff; /* White */
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
        }
        .nav-links li a {
          color: #ffffff; /* White */
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .nav-links li a:hover {
          color: #bbb; /* Light Gray */
        }
        .nav-icons {
          display: flex;
          gap: 1rem;
        }
        .icon-button {
          background: transparent;
          border: none;
          font-size: 1.3rem;
          color: #ffffff; /* White */
          cursor: pointer;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;