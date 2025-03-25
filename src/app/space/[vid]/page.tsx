'use client'

import Image from "next/image";
import getSpace from "@/libs/getSpace";
import styles from './page.module.css';
import { Space, Review } from "../../../../interface";
import getReviews from "@/libs/getReviews";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getUserProfile from "@/libs/getUserProfile";

export default function SpaceDetailPage({ params }: { params: { vid: string } }) {
  const { data: session } = useSession(); // ตรวจสอบ session บน client
  const [workspace, setWorkspace] = useState<Space | null>(null); // เก็บข้อมูล workspace
  const [reviews, setReviews] = useState<Review[]>([]); // เก็บข้อมูล reviews
  const [profile, setProfile] = useState<any>(null); // เก็บข้อมูล profile

  useEffect(() => {
    const fetchData = async () => {
      // ดึงข้อมูล workspace
      const workspaceData = await getSpace(params.vid);
      setWorkspace(workspaceData);

      if (session && session.user?.token) {
        // ดึงข้อมูล profile ถ้าผู้ใช้ล็อกอิน
        const profileData = await getUserProfile(session.user.token);
        setProfile(profileData);
      }

      try {
        // ดึงข้อมูลรีวิว
        const reviewsData = await getReviews(params.vid);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData(); // เรียกใช้งานฟังก์ชัน fetchData เมื่อ component โหลด

  }, [session, params.vid]); // ใช้ session และ params.vid เป็น dependency

  if (!workspace) {
    return <div>Loading...</div>; // หาก workspace ยังไม่โหลดเสร็จแสดงข้อความ Loading...
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <Image
          src={workspace.picture}
          alt="Welcome to Space"
          width={500}
          height={300}
          className={styles.welcomeImage}
        />
        <div className={styles.Text}>
          <h2>{workspace.name}</h2>
          <h5>Address: {workspace.address}</h5>
          <h5>Telephone: {workspace.telephone}</h5>
          <h5>Open Time: {workspace.openTime}</h5>
          <h5>Close Time: {workspace.closeTime}</h5>
          <h5>Size: {workspace.size} m²</h5>
          <h5>Seats: {workspace.minSeats} - {workspace.maxSeats} people</h5>
          <a href={`${params.vid}/reservation`}>
            <div className={styles.Button}>Book Now</div>
          </a>
        </div>
      </div>

      <div className={styles.containerHr}>
        <hr className={styles.divider} />
      </div>
      <div className={styles.containerReviews}>
        <div className={styles.HeaderText}>
          <h1>Reviews</h1>
          {reviews.length > 0 && (
            <div className={styles.averageRating}>
              <h4>Average Rating: {workspace.averageRating} ({reviews.length} Review{reviews.length > 1 ? 's' : ''})</h4>
            </div>
          )}
        </div>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review: Review) => (
            <div key={review._id} className={styles.reviewCard}>
              <div className={styles.reviewHeaderLeft}>
                <h3>{review.user.name}</h3>
              </div>
              <hr className={styles.separator} />
              <div className={styles.reviewContent}>
                <p>Rating: {review.rating}</p>
                <p>{review.comment}</p>
              </div>
              {/* เช็คว่ารีวิวนี้เป็นของผู้ใช้ที่ล็อกอินหรือไม่ */}
              {profile?.data?._id === review.user._id && (
                <a href={`/review/${review._id}`}>
                  <div className={styles.editButton}>Edit Review</div>
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
