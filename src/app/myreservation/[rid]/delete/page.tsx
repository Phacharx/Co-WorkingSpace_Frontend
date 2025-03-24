'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import styles from './page.module.css';

const Delete = ({ params }: { params: { rid: string } }) => {
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
      const response = await axios.delete(`http://localhost:5003/api/v1/reservations/${params.rid}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.token}`, 
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to delete reservation");
      }

      window.location.href = "/myreservation"; 
    } catch (error) {
      console.error("Error deleting reservation:", error);
      setError("Failed to delete reservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Delete Reservation</h2>
        <h3>Are you sure you want to delete this reservation?</h3>
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
