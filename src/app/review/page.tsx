'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Rating from '@mui/material/Rating';  // Import Rating component from Material UI
import styles from './page.module.css';

export default function CreateReview() {
  const { data: session } = useSession();
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();  // Use useRouter to handle redirection

  useEffect(() => {
    async function fetchSpaces() {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/v1/spaces`);
        if (response.status === 200) {
          setSpaces(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching spaces', error);
      }
    }

    fetchSpaces();
  }, []);

  const handleSubmit = async () => {
    if (!session?.user?.token) {
      setError('No token found. Please log in again.');
      return;
    }

    if (!selectedSpace || rating === 0 || !comment) {
      setError('Please fill out all fields.');
      return;
    }

    const payload = {
      rating,
      comment,
    };

    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/spaces/${selectedSpace}/reviews`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        setSelectedSpace('');
        setRating(0);
        setComment('');
        
        // Redirect to the space page after submitting the review
        router.push('/space');
      }
    } catch (error: any) {
      // Capture the error message from the backend
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Error creating review';
        setError(errorMessage);
      } else {
        setError('Error creating review');
      }
      console.error('Error creating review:', error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2 className={styles.title}>Create Review</h2>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Review submitted successfully!</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="space" className={styles.label}>Select a Workspace:</label>
          <select
            id="space"
            className={styles.select}
            value={selectedSpace}
            onChange={(e) => setSelectedSpace(e.target.value)}
          >
            <option value="">Select a workspace</option>
            {spaces.map((space: { id: string; name: string }) => (
              <option key={space.id} value={space.id}>
                {space.name}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="space" className={styles.label}>Rating:</label>
        <div className={styles.inputGroup}>
          <Rating
            name="rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue || 0)}  // Update rating
            precision={0.5}  // Half-star precision
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="comment" className={styles.label}>Comment</label>
          <textarea
            id="comment"
            className={styles.textarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
}
