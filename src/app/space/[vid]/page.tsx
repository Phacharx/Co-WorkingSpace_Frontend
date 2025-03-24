import Image from "next/image";
import getSpace from "@/libs/getSpace";
import styles from './page.module.css';
import { Space, Review } from "../../../../interface";
import getReviews from "@/libs/getReviews";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default async function spaceDetailPage({params}:{params:{vid:string}}) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const Profile = await getUserProfile(session.user.token);
    console.log(Profile.data._id);
    const workspace: Space = await getSpace(params.vid);
    let reviews: Review[] = [];

    try {
        reviews = await getReviews(params.vid);
    } catch (error) {
        // console.error('Error fetching reviews:', error);
    }

    const handleEditReview = (reviewId: string) => {
        // เพิ่มฟังก์ชันเพื่อแก้ไขรีวิว
        console.log(`Editing review with ID: ${reviewId}`);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <Image
                    src={workspace.data.picture} 
                    alt="Welcome to Space"
                    width={500}
                    height={300}
                    className={styles.welcomeImage}
                />
                <div className={styles.Text}>
                    <h2>{workspace.data.name}</h2>
                    <h5>Address: {workspace.data.address}</h5>
                    <h5>Telephone: {workspace.data.telephone}</h5>
                    <h5>Open Time: {workspace.data.openTime}</h5>
                    <h5>Close Time: {workspace.data.closeTime}</h5>
                    <h5>Size: {workspace.data.size} m²</h5>
                    <h5>Seats: {workspace.data.minSeats} - {workspace.data.maxSeats} people</h5>
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
                            <h4>Average Rating: {workspace.data.averageRating.toFixed(1)} ({reviews.length} Review{reviews.length > 1 ? 's' : ''})</h4>
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
                            {/* เพิ่มเงื่อนไขเพื่อตรวจสอบว่ารีวิวเป็นของผู้ใช้ปัจจุบันหรือไม่ */}
                            {Profile.data._id === review.user._id && (
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
