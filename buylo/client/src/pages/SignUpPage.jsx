import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUpPage.css'; // Import the new CSS
import UsersApI from '../services/UsersAPI'; // Import the UsersAPI service

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name:'',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try{
        const result = await UsersApI.createUser({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        });
    }catch( error){
        console.error("Error creating account:", error);
    }

    
  };

  return (
    <main className="container signup-container">
      <article>
        <header className="signup-header">
          <h2>CREATE YOUR ACCOUNT</h2>
        </header>

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
          <label htmlFor="last_Name">
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
              placeholder="Create password"
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