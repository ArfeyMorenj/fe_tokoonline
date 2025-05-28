import React, { useState } from 'react';
import { useRouter } from 'next/router';

const styles = {
  container: {
    width: '400px',
    margin: '50px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    borderRadius: '10px',
    overflow: 'hidden',
    background: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    background: '#4f46e5',
    color: '#fff',
    fontWeight: '600',
    fontSize: '18px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  activeTab: {
    flex: 1,
    padding: '15px',
    borderBottom: '4px solid #ff7f50',
  },
  inactiveTab: {
    flex: 1,
    padding: '15px',
    borderBottom: '4px solid transparent',
    opacity: 0.7,
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
    padding: '10px 12px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1.5px solid #ddd',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#4f46e5',
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
    transition: 'background 0.3s',
  },
  errorText: {
    color: '#e63946',
    fontSize: '13px',
    marginTop: '-15px',
    marginBottom: '15px',
  },
};

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit} noValidate>
      {error && <div style={styles.errorText}>{error}</div>}
      <label htmlFor="loginEmail" style={styles.label}>Email</label>
      <input
        id="loginEmail"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{
          ...styles.input,
          ...(focusedInput === 'loginEmail' ? styles.inputFocus : {}),
        }}
        onFocus={() => setFocusedInput('loginEmail')}
        onBlur={() => setFocusedInput(null)}
        placeholder="Enter your email"
      />
      <label htmlFor="loginPassword" style={styles.label}>Password</label>
      <input
        id="loginPassword"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{
          ...styles.input,
          ...(focusedInput === 'loginPassword' ? styles.inputFocus : {}),
        }}
        onFocus={() => setFocusedInput('loginPassword')}
        onBlur={() => setFocusedInput(null)}
        placeholder="Enter your password"
      />
      <button
        type="submit"
        style={styles.button}
        onMouseOver={e => (e.currentTarget.style.background = '#4338ca')}
        onMouseOut={e => (e.currentTarget.style.background = '#4f46e5')}
      >
        Login
      </button>
    </form>
  );
}

function RegisterForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    if (!name) {
      setError('Name is required');
      return;
    }
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    onSubmit({ name, email, password });
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit} noValidate>
      {error && <div style={styles.errorText}>{error}</div>}
      <label htmlFor="registerName" style={styles.label}>Name</label>
      <input
        id="registerName"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          ...styles.input,
          ...(focusedInput === 'registerName' ? styles.inputFocus : {}),
        }}
        onFocus={() => setFocusedInput('registerName')}
        onBlur={() => setFocusedInput(null)}
        placeholder="Enter your full name"
      />
      <label htmlFor="registerEmail" style={styles.label}>Email</label>
      <input
        id="registerEmail"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{
          ...styles.input,
          ...(focusedInput === 'registerEmail' ? styles.inputFocus : {}),
        }}
        onFocus={() => setFocusedInput('registerEmail')}
        onBlur={() => setFocusedInput(null)}
        placeholder="Enter your email"
      />
      <label htmlFor="registerPassword" style={styles.label}>Password</label>
      <input
        id="registerPassword"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{
          ...styles.input,
          ...(focusedInput === 'registerPassword' ? styles.inputFocus : {}),
        }}
        onFocus={() => setFocusedInput('registerPassword')}
        onBlur={() => setFocusedInput(null)}
        placeholder="Enter your password"
      />
      <label htmlFor="registerConfirmPassword" style={styles.label}>Confirm Password</label>
      <input
        id="registerConfirmPassword"
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        style={{
          ...styles.input,
          ...(focusedInput === 'registerConfirmPassword' ? styles.inputFocus : {}),
        }}
        onFocus={() => setFocusedInput('registerConfirmPassword')}
        onBlur={() => setFocusedInput(null)}
        placeholder="Confirm your password"
      />
      <button
        type="submit"
        style={styles.button}
        onMouseOver={e => (e.currentTarget.style.background = '#4338ca')}
        onMouseOut={e => (e.currentTarget.style.background = '#4f46e5')}
      >
        Register
      </button>
    </form>
  );
}

export default function App() {
  const [activeForm, setActiveForm] = useState('login');
  const router = useRouter();

  const handleLoginSubmit = data => {
    // Simulasi login berhasil
    localStorage.setItem('token', 'contoh-token');
    router.push('/produk');
  };

  const handleRegisterSubmit = data => {
    alert(`Registered user ${data.name} with email ${data.email}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div
          style={activeForm === 'login' ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveForm('login')}
        >
          Login
        </div>
        <div
          style={activeForm === 'register' ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveForm('register')}
        >
          Register
        </div>
      </div>
      {activeForm === 'login' ? (
        <LoginForm onSubmit={handleLoginSubmit} />
      ) : (
        <RegisterForm onSubmit={handleRegisterSubmit} />
      )}
    </div>
  );
}
