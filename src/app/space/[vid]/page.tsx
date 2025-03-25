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
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        setIsLoading(true);

        const [spaceData, profileData] = await Promise.all([
          getSpace(params.vid),
          session && session.user?.token ? getUserProfile(session.user.token) : Promise.resolve(null),
        ]);

        setWorkspace(spaceData.data);
        setProfile(profileData?.data || null);

        // ✅ Log profile ที่ได้จาก API
        console.log("✅ Profile fetched from API:", profileData?.data || null);

      } catch (error) {
        console.error('❌ Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaceData();
  }, [session, params.vid]);

  // ✅ Log profile ปัจจุบันใน state ทุกครั้งที่ component re-render
  console.log("🌀 Current profile state:", profile);

  if (isLoading || !workspace || !profile) {
    return <div>Loading...</div>;
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
          {workspace.reviews.length > 0 && (
            <div className={styles.averageRating}>
              <h4>
                Average Rating: {workspace.averageRating} ({workspace.reviews.length} Review{workspace.reviews.length > 1 ? 's' : ''})
              </h4>
            </div>
          )}
        </div>

        {workspace.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          workspace.reviews.map((review) => {
            // ✅ Log การเปรียบเทียบ user ID
            console.log("👤 Comparing:", {
              profileId: profile._id,
              reviewUserId: review.user,
              matched: profile._id === review.user
            });

            return (
              <div key={review._id} className={styles.reviewCard}>
                <div className={styles.reviewContent}>
                  <h3>Rating: {review.rating}</h3>
                  <p>{review.comment}</p>
                </div>
                {profile && profile._id === review.user && (
                  <a href={`/review/${review._id}`}>
                    <div className={styles.editButton}>Edit Review</div>
                  </a>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
