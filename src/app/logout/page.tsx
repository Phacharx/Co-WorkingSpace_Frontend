'use client'
import React from 'react';
import { signOut } from "next-auth/react";
import styles from './page.module.css';

const Logout = () => {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/'
    });
  };

  return (
    <div className={styles.overlay}>
      <h2>Are you sure you want to sign out?</h2>
      <button onClick={handleLogout} className={styles.logoutButton}>Sign out</button>
      <br />
      <button onClick={() => window.location.href = '/'} className={styles.cancelButton}>Cancel</button>
    </div>
  );
};

export default Logout;