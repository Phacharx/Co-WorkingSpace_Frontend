'use client';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"; // Using useSession hook
import Rating from '@mui/material/Rating';  // Import the Rating component from Material UI
import styles from './page.module.css';

export default function ReviewPage({ params }: { params: { rid: string } }) {
    const { data: session } = useSession(); // Get session using the useSession hook
    const [rating, setRating] = useState<number>(0); // Ensure rating defaults to 0
    const [comment, setComment] = useState<string>(""); // Ensure comment defaults to empty string
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); 
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // For success messages
    const router = useRouter();

    useEffect(() => {
        if (!session) return;  // Prevent fetching review if no session is found

        const fetchReview = async () => {
            try {
                const response = await axios.get(`http://localhost:5003/api/v1/reviews/${params.rid}`, {
                    headers: {
                        "Authorization": `Bearer ${session?.user?.token}`
                    }
                });
                setRating(response.data.rating || 0);  // Ensure fallback to 0 if rating is undefined
                setComment(response.data.comment || ""); // Ensure fallback to empty string if comment is undefined
            } catch (error) {
                console.error("Error fetching review:", error);
                setError("Failed to fetch review details.");
            }
        };

        fetchReview();
    }, [params.rid, session]);

    const handleUpdate = async () => {
        if (isUpdating) return; 
        setIsUpdating(true);
        setError(null);
        setSuccessMessage(null); // Reset success message

        const updatedReview = { rating, comment };
        try {
            const response = await axios.put(`http://localhost:5003/api/v1/reviews/${params.rid}`, updatedReview, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user?.token}`
                },
            });

            if (response.status === 200) {
                setSuccessMessage("Review updated successfully!");
                router.push("/space");
            } else {
                throw new Error("Failed to update review.");
            }
        } catch (error) {
            console.error("Error updating review:", error);
            setError("Failed to update review.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (isDeleting) return;
        setIsDeleting(true);
        setError(null);
        setSuccessMessage(null); // Reset success message

        try {
            const response = await axios.delete(`http://localhost:5003/api/v1/reviews/${params.rid}`, {
                headers: {
                    'Authorization': `Bearer ${session?.user?.token}`
                }
            });

            if (response.status === 200) {
                setSuccessMessage("Review deleted successfully!");
                router.push("/space");
            } else {
                throw new Error("Failed to delete review.");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            setError("Failed to delete review.");
        } finally {
            setIsDeleting(false);
        }
    };

    if (!session) return <div>Loading...</div>; // Show loading while session is being fetched

    return (
        <div className={styles.overlay}>
            <div className={styles.reviewPage}>
                <h2 className={styles.heading}>Review Details</h2>
                {error && <p className={styles.error}>{error}</p>} {/* Show error message */}
                {successMessage && <p className={styles.success}>{successMessage}</p>} {/* Show success message */}
                <div>
                    <label className={styles.label}>Rating:</label>
                    <Rating
                        name="review-rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue || 0)} // Use the new value from the Rating component
                        precision={0.5} // Allows half stars
                    />
                </div>
                <div>
                    <label className={styles.label}>Comment:</label>
                    <textarea
                        className={styles.textarea}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div>
                    <button className={styles.button} onClick={handleUpdate} disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update Review"}
                    </button>
                    <button className={styles.button} onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete Review"}
                    </button>
                </div>
            </div>
        </div>
    );
}
