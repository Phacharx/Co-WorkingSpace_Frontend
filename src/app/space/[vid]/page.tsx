'use client'

import Image from "next/image";
import getSpace from "@/libs/getSpace";
import styles from './page.module.css';
import { Space } from "../../../../interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getUserProfile from "@/libs/getUserProfile";

export default function SpaceDetailPage({ params }: { params: { vid: string } }) {
  const { data: session } = useSession(); // Check session on the client side
  const [workspace, setWorkspace] = useState<Space | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // กำหนดสถานะการโหลด

  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        setIsLoading(true); // ตั้งค่าเป็น loading ก่อนเริ่มการดึงข้อมูล
        const spaceData = await getSpace(params.vid); // Fetch workspace data (รวมถึงรีวิว)
        
        setWorkspace(spaceData.data);

        if (session && session.user?.token) {
          const profileData = await getUserProfile(session.user.token);
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // ตั้งค่าเป็น false เมื่อข้อมูลเสร็จสิ้นการดึง
      }
    };

    fetchSpaceData();
  }, [session, params.vid]); // Fetch when session or vid changes

  // เพิ่ม log เพื่อดูว่า workspace และ reviews ถูกตั้งค่าแล้ว
  console.log("Workspace fetched:", workspace);

  if (isLoading) {
    return <div>Loading...</div>; // หากกำลังโหลดอยู่แสดงข้อความ Loading
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {workspace && (
          <Image
            src={workspace.picture}
            alt="Welcome to Space"
            width={500}
            height={300}
            className={styles.welcomeImage}
            priority
          />
        )}
        <div className={styles.Text}>
          <h2>{workspace?.name}</h2>
          <h5>Address: {workspace?.address}</h5>
          <h5>Telephone: {workspace?.telephone}</h5>
          <h5>Open Time: {workspace?.openTime}</h5>
          <h5>Close Time: {workspace?.closeTime}</h5>
          <h5>Size: {workspace?.size} m²</h5>
          <h5>Seats: {workspace?.minSeats} - {workspace?.maxSeats} people</h5>
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
          {workspace?.reviews && workspace.reviews.length > 0 && (
            <div className={styles.averageRating}>
              <h4>Average Rating: {workspace.averageRating} ({workspace.reviews.length} Review{workspace.reviews.length > 1 ? 's' : ''})</h4>
            </div>
          )}
        </div>
        {workspace?.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          workspace?.reviews?.map((review) => (
            <div key={review._id} className={styles.reviewCard}>
              {/* <div className={styles.reviewHeaderLeft}>
                <h3>{review.user.name}</h3>
              </div> */}
              <hr className={styles.separator} />
              <div className={styles.reviewContent}>
                <p>Rating: {review.rating}</p>
                <p>{review.comment}</p>
              </div>
              {session && profile?.data?._id === review.user._id && (
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
