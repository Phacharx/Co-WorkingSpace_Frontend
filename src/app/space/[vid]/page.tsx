import Image from "next/image";
import getSpace from "@/libs/getSpace";
import styles from './page.module.css';
import { Space, Review } from "../../../../interface";
import getReviews from "@/libs/getReviews";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default async function spaceDetailPage({ params }: { params: { vid: string } }) {
    const session = await getServerSession(authOptions);
    
    // Check if session is available
    if (!session || !session.user.token) {
        return (
            <div className={styles.overlay}>
                <div className={styles.container}>
                    <h2>Please log in to view the details</h2>
                </div>
            </div>
        );
    }

    const Profile = await getUserProfile(session.user.token);
    console.log(Profile.data._id);

    const workspace: Space = await getSpace(params.vid);
    let reviews: Review[] = [];

    try {
        reviews = await getReviews(params.vid);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }

    const handleEditReview = (reviewId: string) => {
        // Handle editing a review
        console.log(`Editing review with ID: ${reviewId}`);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <Image
                    src={workspace.picture} // Direct access to `picture`
                    alt="Welcome to Space"
                    width={500}
                    height={300}
                    className={styles.welcomeImage}
                />
                <div className={styles.Text}>
                    <h2>{workspace.name}</h2>  {/* Direct access to `name` */}
                    <h5>Address: {workspace.address}</h5> {/* Direct access to `address` */}
                    <h5>Telephone: {workspace.telephone}</h5> {/* Direct access to `telephone` */}
                    <h5>Open Time: {workspace.openTime}</h5> {/* Direct access to `openTime` */}
                    <h5>Close Time: {workspace.closeTime}</h5> {/* Direct access to `closeTime` */}
                    <h5>Size: {workspace.size} m²</h5> {/* Direct access to `size` */}
                    <h5>Seats: {workspace.minSeats} - {workspace.maxSeats} people</h5> {/* Direct access to `minSeats` and `maxSeats` */}
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
                            <h4>Average Rating: {workspace.averageRating} ({reviews.length} Review{reviews.length > 1 ? 's' : ''})</h4> {/* Direct access to `averageRating` */}
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
                            {/* Check if the review belongs to the current user */}
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
