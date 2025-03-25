'use client';
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function UpdateSpace({ params }: { params: { vid: string } }) {
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
  const [error, setError] = useState<string | null>(null); // For error handling
  const router = useRouter();

  useEffect(() => {
    const fetchSpaceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/api/v1/spaces/${params.vid}`, {
          headers: {
            "Authorization": `Bearer ${session?.user?.token}`,
          },
        });

        if (response.status === 200) {
          const spaceData = response.data.data;
          setName(spaceData.name);
          setAddress(spaceData.address);
          setTelephone(spaceData.telephone);
          setOpenTime(spaceData.openTime);
          setCloseTime(spaceData.closeTime);
          setSize(spaceData.size);
          setMinSeats(spaceData.minSeats);
          setMaxSeats(spaceData.maxSeats);
          setPicture(spaceData.picture);
        }
      } catch (error) {
        console.error("Error fetching space details:", error);
        setError("Failed to fetch space details.");
      }
    };

    if (session?.user?.token) {
      fetchSpaceDetails();
    }
  }, [params.vid, session]);

  const handleUpdate = async () => {
    if (!session?.user?.token) {
      setError("No token found. Please log in again.");
      return;
    }

    const vid = params.vid;

    if (!vid) {
      setError("Space ID is missing.");
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
      const response = await axios.put(`http://localhost:5003/api/v1/spaces/${vid}`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to update space");
      }

      router.push('/space'); // Redirect after successful update
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Error updating space");
      } else {
        setError("Error updating space");
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Update Space</h2>

          {error && <p className={styles.error}>{error}</p>}

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

          <button className={styles.button} onClick={handleUpdate}>
            Update Space
          </button>
        </div>
      </div>
    </div>
  );
}
