'use client';
import { useSession } from "next-auth/react";
import getSpaces from "@/libs/getSpaces";
import styles from "./page.module.css";
import { Space } from "../../../../../interface";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function UpdateReservation({ params }: { params: { rid: string } }) {
  const { data: session } = useSession();
  const [workspaces, setWorkspaces] = useState<Space[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);  // For error handling
  const router = useRouter();

  useEffect(() => {
    async function fetchWorkspaces() {
      const data = await getSpaces();
      if (data.success) {
        setWorkspaces(data.data);
      }
    }

    fetchWorkspaces();
  }, []);

  const handleUpdate = async () => {
    if (!session?.user?.token) {
      setError("No token found. Please log in again.");
      return;
    }

    if (!selectedWorkspace || !selectedDate) {
      setError("Please select a workspace and a date.");
      return;
    }

    const reservationId = params.rid;

    if (!reservationId) {
      setError("Reservation ID is missing.");
      return;
    }

    const payload = {
      date: new Date(selectedDate).toISOString(),
      space: selectedWorkspace,
    };

    try {
      const response = await axios.put(`${process.env.BACKEND_URL}/api/v1/reservations/${reservationId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to update reservation");
      }

      router.push('/myreservation');
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Error updating reservation");
      } else {
        setError("Error updating reservation");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Update Reservation</h2>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="workspace" className={styles.label}>
            Select a workspace
          </label>
          <select
            id="workspace"
            className={styles.select}
            value={selectedWorkspace}
            onChange={(e) => setSelectedWorkspace(e.target.value)}
          >
            <option value="">Select a workspace</option>
            {workspaces.map((workspace: Space) => (
              <option key={workspace.id} value={workspace.id}>
                {workspace.name}
              </option>
            ))}
          </select>
        </div>

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

        <button className={styles.button} onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}
