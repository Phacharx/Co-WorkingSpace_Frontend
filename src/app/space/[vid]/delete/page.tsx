'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import styles from './page.module.css';

const Delete = ({ params }: { params: { vid: string } }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!session?.user?.token) {
      console.error("No token found. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`${process.env.BACKEND_URL}/api/v1/spaces/${params.vid}`, { // Changed endpoint to match Postman
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to delete space");
      }

      window.location.href = "/space"; // Redirect to the spaces list after deletion
    } catch (error) {
      console.error("Error deleting space:", error);
      setError("Failed to delete space.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Delete Workspace</h2>
        <h3>Are you sure you want to delete this workspace?</h3>
        {error && <p className={styles.error}>{error}</p>}
        <p>
          <button 
            onClick={handleDelete} 
            className={styles.logoutButton} 
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Delete;
