import React, { use } from 'react';
import Image from 'next/image';
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import styles from './TopMenu.module.css';

export default async function TopMenu() {

  const session = await getServerSession(authOptions);
  // console.log(session?.user.token)

  return (
    <header className={styles.topMenu}>
      <div className={styles.logo}>
        <a href='/'>
          <Image
          src="/Image/SPACE.png"
          alt="Space Logo"
          width={75}
          height={25}
          className={styles.logoImage}
        />
        </a>
      </div>
      <div className={styles.navAuth}>
        <nav>
          <ul className={styles.navLinks}>
            <li><a href="/space">Space</a></li>
            <li><a href="/myreservation">My Reservation</a></li>
            <li><a href="/review">Review</a></li>
          </ul>
        </nav>
        {
          session ? (
            <div className={styles.authLogin}>
              <a href="/signout" className={styles.text}>Sign Out</a>
            </div>
          ) : (
            <div className={styles.authLogin}>
              <a href="/signin" className={styles.text}>Sign In</a>
              <a>|</a>
              <a href="/register" className={styles.text}>Register</a>
            </div>
          )
        }
      </div>
    </header>
  );
}