import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import getSpaces from '@/libs/getSpaces';
import { Space } from "../../../interface";
import Link from 'next/link';

export default async function page() {
    const workspaces = await getSpaces();

  return (
    <div className={styles.container}>
      <div className={styles.welcomeSection}>
        <Image
          src="/Image/space.jpg"
          alt="Welcome to Space"
          width={1200}
          height={450}
          className={styles.welcomeImage}
        />
        <div className={styles.welcomeText}>
          <h1>Find Your Perfect Workspace Today</h1>
        </div>
      </div>

      <div className={styles.cardContainer}>
        {workspaces.data.map((workspace:Space)  => (
          <Link  key={workspace.id} href={`/space/${workspace.id}`}>
            <div key={workspace.id} className={styles.card}>
              <Image
                src={workspace.picture}
                alt={workspace.name}
                width={500}
                height={300}
                className={styles.cardImg}
              />
              <div className={styles.cardContent}>
                <div className={styles.cardTitle}>{workspace.name}</div>
                <div className={styles.cardRating}>
                  Average Rating: {workspace.averageRating} ({workspace.reviews.length} Reviews)
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

