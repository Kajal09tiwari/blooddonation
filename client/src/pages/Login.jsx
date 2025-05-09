import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful!");

        if (data.user.role === "donor") {
          navigate("/donor-form");
        } else if (data.user.role === "recipient") {
          navigate("/recipient-form");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login error");
    }
  };

  return (
    <div className="login-page">
      {/* Navbar - Consistent with other pages */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🩸</span>
            <span>BloodConnect</span>
          </Link>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/about" className="navbar-link">About</Link>
            <Link to="/register/donor" className="navbar-link"> Find Donor</Link>     
            <Link to="/FAQ" className="navbar-link">FAQ</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>
            <Link to="/login" className="btn login-btn active">Login</Link>
          </div>
        </div>
      </nav>

      {/* Login Form Section */}
      <div className="login-container">
        <div className="login-image">
        <img src="img.png
          " />        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-subtitle">Sign in to your BloodConnect account</p>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-link">Forgot password?</Link>
          </div>
          
          <button type="submit" className="btn primary-btn full-width-btn">
            Login
          </button>
          
          <div className="form-footer">
            <p>Don't have an account? <Link to="/register/donor" className="text-link">Register as donor</Link> or <Link to="/register/recipient" className="text-link">Register as recipient</Link></p>
          </div>
        </form>
      </div>

      {/* Footer - Consistent with other pages */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">🩸</span>
              <span>BloodConnect</span>
            </div>
            <p className="footer-motto">Connecting donors with those in need</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
            <Link to="/register/donor" className="navbar-link"> Find Donor</Link>     
              <li><Link to="/FAQ">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p><i className="fas fa-envelope"></i> info@bloodconnect.com</p>
            <p><i className="fas fa-phone"></i> +1 234 567 890</p>
            <p><i className="fas fa-map-marker-alt"></i> 123 Health St, Medical City</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
        </div>
      </footer>

      {/* CSS Styles */}
      <style jsx>{`
        /* Base Styles */
        :root {
          --primary: #ff4757;
          --primary-dark: #e84118;
          --secondary: #2f3542;
          --light: #f1f2f6;
          --dark: #1e272e;
          --gray: #a4b0be;
          --white: #ffffff;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        
        /* Navbar Styles */
        .navbar {
          background-color: var(--white);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 1rem 5%;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .navbar-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
        }
        
        .logo-icon {
          margin-right: 0.5rem;
          font-size: 1.8rem;
        }
        
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .navbar-link {
          color: var(--secondary);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.5rem 0;
        }
        
        .navbar-link:hover {
          color: var(--primary);
        }
        
        .navbar-link.active {
          color: var(--primary);
          font-weight: 600;
        }
        
        .navbar-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: var(--primary);
          border-radius: 3px;
        }
        
        /* Button Styles */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          outline: none;
        }
        
        .primary-btn {
          background-color: var(--primary);
          color: var(--white);
          box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
        }
        
        .primary-btn:hover {
          background-color: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 71, 87, 0.4);
        }
        
        .login-btn {
          background-color: var(--primary);
          color: var(--white);
          padding: 0.5rem 1.5rem;
        }
        
        /* Login Page Styles */
        .login-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f8f9fa;
        }
        
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 3rem 5%;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          gap: 4rem;
        }
        
        .login-image {
          flex: 1;
          max-width: 500px;
        }
        
        .login-image img {
          width: 100%;
          height: auto;
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        .login-form {
          flex: 1;
          max-width: 500px;
          background-color: var(--white);
          padding: 2.5rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }
        
        .form-title {
          font-size: 2rem;
          color: var(--dark);
          margin-bottom: 0.5rem;
          text-align: center;
        }
        
        .form-subtitle {
          color: var(--gray);
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--secondary);
          font-weight: 500;
        }
        
        .form-input {
          width: 100%;
          padding: 0.8rem 1.2rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.2);
        }
        
        .form-input::placeholder {
          color: var(--gray);
          opacity: 0.6;
        }
        
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 1.5rem 0;
        }
        
        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--secondary);
          cursor: pointer;
        }
        
        .remember-me input {
          accent-color: var(--primary);
        }
        
        .full-width-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
        }
        
        .form-footer {
          text-align: center;
          margin-top: 1.5rem;
          color: var(--gray);
        }
        
        .text-link {
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
        }
        
        .text-link:hover {
          text-decoration: underline;
        }
        
        /* Footer Styles */
        .footer {
          background-color: var(--secondary);
          color: var(--white);
          padding: 4rem 5% 2rem;
        }
        
        .footer-container {
          display: flex;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 3rem;
        }
        
        .footer-brand {
          flex: 1;
          min-width: 250px;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 1rem;
        }
        
        .footer-motto {
          color: var(--gray);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-links a {
          color: var(--white);
          font-size: 1.2rem;
          transition: color 0.3s ease;
        }
        
        .social-links a:hover {
          color: var(--primary);
        }
        
        .footer-links {
          flex: 1;
          min-width: 150px;
        }
        
        .footer-links h3 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .footer-links h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 2px;
          background-color: var(--primary);
        }
        
        .footer-links ul {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 0.8rem;
        }
        
        .footer-links a {
          color: var(--gray);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: var(--primary);
        }
        
        .footer-contact {
          flex: 1;
          min-width: 250px;
        }
        
        .footer-contact h3 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .footer-contact h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 2px;
          background-color: var(--primary);
        }
        
        .footer-contact p {
          display: flex;
          align-items: center;
          color: var(--gray);
          margin-bottom: 1rem;
        }
        
        .footer-contact i {
          margin-right: 0.8rem;
          color: var(--primary);
          width: 20px;
          text-align: center;
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          margin-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--gray);
          font-size: 0.9rem;
        }
        
        /* Responsive Styles */
        @media (max-width: 992px) {
          .login-container {
            flex-direction: column;
          }
          
          .login-image {
            max-width: 400px;
            margin-bottom: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .navbar-container {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .navbar-links {
            width: 100%;
            flex-direction: column;
            gap: 1rem;
          }
          
          .navbar-link {
            padding: 0.5rem 1rem;
          }
          
          .login-form {
            padding: 1.5rem;
          }
          
          .form-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}