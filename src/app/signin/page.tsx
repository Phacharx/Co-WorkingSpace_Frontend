'use client'
import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from './page.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      console.log("Login failed:", res.error);
      setError("Invalid email or password.");
    } else {
      // Redirect or handle successful login
      window.location.href = "/";
      console.log("/////////////////////Login success");
    }
  };

  return (
    <div className={styles['main']}>
      <div className={styles['login-container']}>
        <h2 className={styles['heading']}>Sign In</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
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
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className={styles.button} type="submit">Sign In</button>
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
          <a href="/register">
            <button className={styles.buttonRegister}>REGISTER</button>
          </a>
      </div>
    </div>
  );
};

export default Login;
