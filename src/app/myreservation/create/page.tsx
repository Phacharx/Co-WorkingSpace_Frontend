'use client'
import { useSession } from "next-auth/react";
import getSpaces from "@/libs/getSpaces";
import styles from "./page.module.css";
import { Space } from "../../../../interface";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateReservation() {
  const { data: session } = useSession();
  const [workspaces, setWorkspaces] = useState<Space[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
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

  const handleCreate = async () => {
    if (!session?.user?.token) {
      console.error("No token found. Please log in again.");
      return;
    }

    if (!selectedWorkspace || !selectedDate) {
      console.error("Please select a workspace and a date.");
      return;
    }

    const payload = {
      date: new Date(selectedDate).toISOString(),
      space: selectedWorkspace,
    };

    try {
      const response = await axios.post(`http://localhost:5003/api/v1/spaces/${selectedWorkspace}/reservations`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to create reservation");
      }

      router.push('/myreservation');
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Reservation</h2>

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

        <button className={styles.button} onClick={handleCreate}>
          Create Reservation
        </button>
      </div>
    </div>
  );
}
