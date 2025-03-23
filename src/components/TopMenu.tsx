import React from 'react';
import Image from 'next/image';
import styles from './TopMenu.module.css';

const TopMenu = () => {
  return (
    <header className={styles.topMenu}>
      <div className={styles.logo}>
        <Image
          src="/Image/SPACE.png"
          alt="Space Logo"
          width={120}
          height={40}
          className={styles.logoImage}
        />
      </div>
      <nav>
        <ul className={styles.navLinks}>
          <li><a href="#space">Space</a></li>
          <li><a href="#my-reservation">My Reservation</a></li>
          <li><a href="#review">Review</a></li>
        </ul>
      </nav>
      <div className={styles.authLogin}>
        <a href="#login">Login</a>
        <a>|</a>
        <a href="#register">Register</a>
      </div>
    </header>
  );
}

export default TopMenu;
