'use client'

import { useState } from "react";
import styles from './page.module.css';
import { userRegister } from "@/libs/userRegister"; // นำเข้า Server Action

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await userRegister(name, email, phone, password);
      window.location.href = "/login";
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className={styles['main']}>
      <div className={styles['register-container']}>
        <h2 className={styles['heading']}>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleRegister}>
          <div className={styles['form-group']}>
            <label className={styles.label}>Full Name</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label className={styles.label}>Email Address</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label className={styles.label}>Phone Number</label>
            <input
              className={styles.input}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className={styles.button} type="submit">Register</button>
        </form>
      </div>
      <hr className={styles.separator} />
      <div className={styles['rightSide']}>
        <h1 className={styles['heading']}>Register</h1>
        <p>
          Register with Space today to enjoy exclusive benefits 
          and special promotions available only to members. Sign 
          up with us to access special offers and enjoy numerous 
          benefits, including the ability to book Co-Working Spaces 
          easily and quickly. You can also track your booking status, 
          service history, and payment information seamlessly through 
          our system.
        </p>
        <a href="/login">
          <button className={styles.buttonLogin}>LOGIN</button>
        </a>
      </div>
    </div>
  );
};

export default Register;
