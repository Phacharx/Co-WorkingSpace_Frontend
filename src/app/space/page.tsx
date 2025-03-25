'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import getSpaces from '@/libs/getSpaces';
import { Space } from "../../../interface";
import Link from 'next/link';
import { useSession } from "next-auth/react"; // Use useSession hook
import getUserProfile from '@/libs/getUserProfile';

export default function Page() {
  const { data: session } = useSession(); // Check session on the client side
  const [workspaces, setWorkspaces] = useState<Space[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      const spacesData = await getSpaces();
      setWorkspaces(spacesData.data);

      if (session && session.user?.token) {
        // Get profile only if the user is logged in
        const profileData = await getUserProfile(session.user.token);
        setProfile(profileData);
      }
    };

    fetchSpaces();
  }, [session]); // Fetch spaces and profile only if the session changes

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

      {session && profile?.data?.role === 'admin' && (
        <a href={`/space/create`}>
          <button className={styles.createButton}>Create Space</button>
        </a>
      )}

      <div className={styles.cardContainer}>
        {workspaces.map((workspace: Space) => (
          <div key={workspace.id} className={styles.card}>
            <Link href={`/space/${workspace.id}`}>
              <div>
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

            {session && profile?.data?.role === 'admin' && (
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
