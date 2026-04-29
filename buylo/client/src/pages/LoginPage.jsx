import React, { useState, useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import UsersAPI from '../services/UsersAPI'; 
import { isValidEmail } from '../utils/validation'; // 1. Import your validation logic
import '../styles/LogInPage.css';

const LogInPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  // 2. Add local state to track validation errors
  const [error, setError] = useState('');

  const navigate = useNavigate();  
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Clear errors when the user starts typing again
    if (error) setError('');
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 3. Perform Frontend Validation
    if (!isValidEmail(credentials.email)) {
      setError("Please enter a valid email address.");
      return; // Stop the login process
    }

    if (!credentials.password || credentials.password.length < 1) {
      setError("Please enter your password.");
      return;
    }

    try {
      const result = await UsersAPI.loginUser({
        email: credentials.email,
        password: credentials.password
      });

      if (result.token) {
        localStorage.setItem('token', result.token);
        const user = await UsersAPI.getUserProfile();     
        login(user, result.token); 
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      // Capture backend validation or auth errors
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <main className="container login-container">
      <article>
        <header className="login-header">
          <h2>SIGN IN TO YOUR ACCOUNT</h2>
        </header>

        {/* 4. Display Error Message */}
        {error && (
          <p style={{ 
            color: '#d9534f', 
            backgroundColor: '#f9f2f2', 
            padding: '10px', 
            borderRadius: '4px',
            border: '1px solid #d9534f',
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <label htmlFor="email">
            Email Address:
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              // Optional: highlight the box if there's an email error
              className={error && !isValidEmail(credentials.email) ? "input-error" : ""}
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
            <Link to="/signup" className="create-account-link"> [Create One]</Link>
          </p>
        </footer>
      </article>
    </main>
  );
};

export default LogInPage;