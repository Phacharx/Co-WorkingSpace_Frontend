import React from 'react';
import Image from 'next/image';
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import styles from './TopMenu.module.css';

export default async function TopMenu() {

  const session = await getServerSession(authOptions)
  console.log(session)

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
        {
          session ? (
            <div className={styles.authLogout}>
              <a href="/logout">Logout</a>
            </div>
          ) : (
            <div className={styles.authLogin}>
              <a href="/login">Login</a>
              <a>|</a>
              <a href="/register">Register</a>
            </div>
          )
        }
    </header>
  );
}