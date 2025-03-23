'use client'
import React, { useState } from 'react';
import styles from './page.module.css'; // Import CSS module

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/v1/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.href = "/"; // Redirect to home page after logout
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className={styles.logoutContainer}>
      <h2>Are you sure you want to sign out?</h2>
      <button onClick={handleLogout} className={styles.logoutButton}>Sign out</button>
      <br />
      <button onClick={() => window.location.href = '/'} className={styles.cancelButton}>Cancel</button>
    </div>
  );
};

export default Logout;
