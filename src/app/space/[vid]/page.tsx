import Image from "next/image";
import getSpace from "@/libs/getSpace";
import styles from './page.module.css';
import { Space, Review } from "../../../../interface";

export default async function spaceDetailPage({params}:{params:{vid:string}}) {

    const workspace: Space = await getSpace(params.vid);
    const reviews: Review[] = workspace.data.reviews || [];  // ให้แน่ใจว่าได้ array reviews มา

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
                    <a href={'/reservations'}>
                        <button className={styles.Button}>Book Now</button>
                    </a>
                </div>
            </div>

            <div className={styles.containerHr}>
                <hr className={styles.divider} />
            </div>

            <div className={styles.containerReviews}>
                <h1>Reviews</h1>
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    reviews.map((review: Review) => (
                        <div key={review._id} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <h3>{review.user.name}</h3>
                                <span>Rating: {review.rating}</span>
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
