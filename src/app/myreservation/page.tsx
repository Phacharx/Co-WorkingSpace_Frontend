import getReservations from "@/libs/getReservations";
import styles from "./page.module.css";
import { Reservation } from "../../../interface";

export default async function reservation() {
    const reservations = await getReservations();

    return (
        <main className={styles.main}>
            <h1 className={styles.HeaderText}>Reservation</h1>
            <a href={`/myreservation/create`}><button className={styles.createButton}>Create Now</button></a>
            
            {/* ตรวจสอบว่ามีข้อมูลใน reservations.data หรือไม่ */}
            {reservations && reservations.data && reservations.data.length > 0 ? (
                reservations.data.map((reservation: Reservation) => (
                    <div key={reservation._id} className={styles.reservation}>
                        <h2>Username: {reservation.user.name}</h2>
                        <h2>Co-Working Space: {reservation.space.name}</h2>
                        <h2>Booking Date: {new Date(reservation.date).toLocaleDateString()}</h2>
                        <div className={styles.groupButton}>
                            <div className={styles.flexButton}>
                                <a href={`/myreservation/${reservation._id}/update`}>
                                    <button className={styles.updateButton}>Update Now</button>
                                </a>
                                <a href={`/myreservation/${reservation._id}/delete`}>
                                    <button className={styles.deleteButton}>Remove Now</button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className={styles.noText}>No reservations yet.</p>
            )}
        </main>
    );
}
