import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css'; 
import { AuthContext } from '../context/AuthContext'; 
import { useToast } from '../context/useToast';
import UsersAPI from '../services/UsersAPI'; 
// 1. Import the validation functions
import { isValidEmail, isNameValid } from '../utils/validation';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  // 2. Add error state
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);  
  const navigate = useNavigate();
  const { success } = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (error) setError(''); // Clear errors as user types
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- 3. FRONTEND VALIDATION LOGIC ---
    if (!isNameValid(formData.first_name)) {
      setError("First name should only contain letters.");
      return;
    }

    if (!isNameValid(formData.last_name)) {
      setError("Last name should only contain letters.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }
    // ------------------------------------

    try {
      const result = await UsersAPI.createUser({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword
      });

      if (result && result.token) {
        localStorage.setItem("token", result.token);
        const user = await UsersAPI.getUserProfile();        
        login(user, result.token);
        success("Registration successful! Welcome to BuyLo.");
        
        // Give context time to update before navigating
        setTimeout(() => {
          navigate("/"); 
        }, 500);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setError(error.response?.data?.message || "An error occurred during registration.");
    }
  };

  return (
    <main className="container signup-container">
      <article>
        <header className="signup-header">
          <h2>CREATE YOUR ACCOUNT</h2>
        </header>

        {/* 4. Display Error Message Banner */}
        {error && (
          <div className="error-message" style={{ 
            color: '#721c24', 
            backgroundColor: '#f8d7da', 
            border: '1px solid #f5c6cb', 
            padding: '10px', 
            marginBottom: '15px', 
            borderRadius: '4px',
            textAlign: 'center' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">
            First Name:
            <input
              type="text"
              id="firstName"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="lastName">
            Last Name:
            <input
              type="text"
              id="lastName"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="email">
            Email Address:
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="password">
            Create Password:
            <input
              type="password"
              id="password"
              name="password"
              placeholder="6+ characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="confirmPassword">
            Confirm Password:
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>

          <fieldset>
            <label htmlFor="agreeToTerms">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              By creating an account, you agree to our 
              <Link to="/terms"> Terms & Conditions</Link>
            </label>
          </fieldset>

          <button type="submit" className="btn-signup">
            [ CREATE ACCOUNT ]
          </button>
        </form>

        <footer className="signup-footer">
          <p>
            [Already have an account? <Link to="/login">Sign In</Link>]
          </p>
        </footer>
      </article>
    </main>
  );
};

export default SignUpPage;