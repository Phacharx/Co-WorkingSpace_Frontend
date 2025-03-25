'use client';
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateSpace() {
  const { data: session } = useSession();
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [openTime, setOpenTime] = useState<string>("05:00");
  const [closeTime, setCloseTime] = useState<string>("19:00");
  const [size, setSize] = useState<number>(15);
  const [minSeats, setMinSeats] = useState<number>(2);
  const [maxSeats, setMaxSeats] = useState<number>(4);
  const [picture, setPicture] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);  // For success message
  const router = useRouter();

  // console.log(session?.user.token);

  const handleCreate = async () => {
    if (!session?.user?.token) {
      setError("No token found. Please log in again.");
      return;
    }

    const payload = {
      name,
      address,
      telephone,
      openTime,
      closeTime,
      size,
      minSeats,
      maxSeats,
      picture,
    };

    try {
      const response = await axios.post(`http://localhost:5003/api/v1/spaces`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setSuccessMessage("Space created successfully!");
        router.push('/spaces'); // Redirect after successful space creation
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error: any) {
      // Log the full error object for debugging
      console.error("Full error details:", error);

      // If the error contains a response, log the status and message from the backend
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
        
        setError(error.response.data.message || "Error creating space");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Create New Space</h2>

          {error && <p className={styles.error}>{error}</p>}
          {successMessage && <p className={styles.success}>{successMessage}</p>}  {/* Show success message if available */}

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address" className={styles.label}>Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="telephone" className={styles.label}>Telephone</label>
            <input
              type="text"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="openTime" className={styles.label}>Open Time</label>
            <input
              type="time"
              id="openTime"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="closeTime" className={styles.label}>Close Time</label>
            <input
              type="time"
              id="closeTime"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="size" className={styles.label}>Size</label>
            <input
              type="number"
              id="size"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="minSeats" className={styles.label}>Min Seats</label>
            <input
              type="number"
              id="minSeats"
              value={minSeats}
              onChange={(e) => setMinSeats(Number(e.target.value))}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="maxSeats" className={styles.label}>Max Seats</label>
            <input
              type="number"
              id="maxSeats"
              value={maxSeats}
              onChange={(e) => setMaxSeats(Number(e.target.value))}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="picture" className={styles.label}>Picture URL</label>
            <input
              type="text"
              id="picture"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              className={styles.input}
            />
          </div>

          <button className={styles.button} onClick={handleCreate}>
            Create Space
          </button>
        </div>
      </div>
    </div>
  );
}
