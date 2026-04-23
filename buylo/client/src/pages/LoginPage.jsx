import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../styles/LogInPage.css';

const LogInPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", credentials);
  };

  return (
    <main className="container login-container">
      <article>
        <header className="login-header">
          <h2>SIGN IN TO YOUR ACCOUNT</h2>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email Address:
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </label>

          {/* Changed anchor to Link */}
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>

          <button type="submit" className="btn-signin">
            [ SIGN IN ]
          </button>
        </form>

        <footer className="login-footer">
          <p>
            Don't have an account? 
            {/* Changed anchor to Link */}
            <Link to="/signup" className="create-account-link"> [Create One]</Link>
          </p>
        </footer>
      </article>
    </main>
  );
};

export default LogInPage;