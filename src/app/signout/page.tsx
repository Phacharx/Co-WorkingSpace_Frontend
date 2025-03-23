'use client'
import React from 'react';
import { signOut } from "next-auth/react";
import styles from './page.module.css';

const Signout = () => {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/'
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Signout</h2>
        <h3>Are you sure you want to sign out?</h3>
        <p>
          <button onClick={handleLogout} className={styles.logoutButton}>Sign out</button>
        </p>
      </div>
    </div>
  );
};

export default Signout;