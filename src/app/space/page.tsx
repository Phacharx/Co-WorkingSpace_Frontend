import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import getSpaces from '@/libs/getSpaces';
import { Space } from "../../../interface";
import Link from 'next/link';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from '@/libs/getUserProfile';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const workspaces = await getSpaces();
  const Profile = await getUserProfile(session.user.token);
  console.log(workspaces.data);

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
      {Profile?.data?.role === 'admin' && (
        <a href={`/space/create`}><button className={styles.createButton}>Create Space</button></a>
      )}
      <div className={styles.cardContainer}>
        {workspaces.data.map((workspace: Space) => (
          <div key={workspace.id} className={styles.card}>
            <Link href={`/space/${workspace.id}`}>
              <div> {/* Removed the <a> tag here */}
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

            {Profile?.data?.role === 'admin' && (
              <div className={styles.adminButtons}>
                <Link href={`/space/${workspace.id}/update`}>
                  <button className={styles.updateButton}>Update</button>
                </Link>
                <Link href={`/space/${workspace.id}/delete`}>
                  <button className={styles.deleteButton}>Delete</button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
