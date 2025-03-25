'use client'
import { useSession } from "next-auth/react";
import getSpaces from "@/libs/getSpaces";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateReservation({ params }: { params: { vid: string } }) {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null);  // Add state to handle errors
  const router = useRouter();

  const handleCreate = async () => {
    if (!session?.user?.token) {
      setError("No token found. Please log in again.");
      return;
    }

    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }

    const payload = {
      date: new Date(selectedDate).toISOString(),
      space: params.vid,
    };

    try {
      const response = await axios.post(`http://localhost:5003/api/v1/spaces/${params.vid}/reservations`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to create reservation");
      }

      router.push('/myreservation');
    } catch (error: any) {
      // Capture error messages from the backend
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Error creating reservation");
      } else {
        setError("Error creating reservation");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Reservation</h2>

        {error && <p className={styles.error}>{error}</p>} {/* Display error message */}

        <div className={styles.inputGroup}>
          <label htmlFor="datePicker" className={styles.label}>
            Pick-Up Date
          </label>
          <input
            type="date"
            id="datePicker"
            className={styles.datePicker}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <button className={styles.button} onClick={handleCreate}>
          Create Reservation
        </button>
      </div>
    </div>
  );
}
