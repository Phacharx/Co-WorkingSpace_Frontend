import React from 'react';
import Image from 'next/image';
import styles from './TopSection.module.css';

const TopSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.welcomeSection}>
        <Image
          src="/Image/Home.png"
          alt="Welcome to Space"
          width={1200}
          height={600}
          className={styles.welcomeImage}
        />
        <div className={styles.welcomeText}>
          <h1>Welcome to Space - Your Ideal Co-Working Space</h1>
        </div>
    </div>

    <div className={styles.featuresSection}>
        <div className={styles.feature}>
          <Image 
            src="/Image/Home1.jpg"
            alt="Why Choose"
            width={1200}
            height={600}
            className={styles.featureImage}
          />
          <div className={`${styles.featureText} ${styles.left}`}>
            <div><h2>Why Choose Co-Working Spaces?</h2></div>
            <div>
                <div>
                    <h3>Boost Your Productivity</h3>
                    <p>Create in a motivating and creative environment.</p>
                    <h3>Networking Opportunities</h3>
                    <p>Connect with professionals from various industries.</p>
                    <h3>Flexibility</h3>
                    <p>Work on your own terms with customizable spaces.</p>
                    <h3>No Commute</h3>
                    <p>Save time by working closer to home.</p>
                    <h3>Cost-Effective</h3>
                    <p>Affordable and fully equipped workspaces.</p>
                </div>
            </div>
          </div>
        </div>

        <div className={styles.feature}>
          <Image 
            src="/Image/Home2.jpg"
            alt="Why Choose"
            width={1200}
            height={600}
            className={styles.featureImage}
          />
          <div className={`${styles.featureText} ${styles.right}`}>
            <div><h2>Our Features & Amenities</h2></div>
            <div>
                <div>
                    <h3>High-Speed Wi-Fi</h3>
                    <p>Reliable internet for uninterrupted work.</p>
                    <h3>Meeting Rooms</h3>
                    <p>Bookable spaces for client meetings or team discussions.</p>
                    <h3>Comfortable Workspace</h3>
                    <p>Private offices and open desks to suit your style.</p>
                    <h3>Coffee & Refreshments</h3>
                    <p>Complimentary drinks to keep you energized.</p>
                    <h3>24/7 Access</h3>
                    <p>Work whenever inspiration strikes.</p>
                </div>
            </div>
          </div>
        </div>

        <div className={styles.feature}>
          <Image 
            src="/Image/Home3.jpg"
            alt="Why Choose"
            width={1200}
            height={600}
            className={styles.featureImage}
          />
          <div className={`${styles.featureText} ${styles.left}`}>
            <div><h2>Join Our Community Today</h2></div>
            <div>
                <div>
                    <h3>Exclusive Offers</h3>
                    <p>Special promotions for registered members.</p>
                    <h3>Track Your Bookings</h3>
                    <p>Easily manage your reservations and payments.</p>
                    <h3>Seamless Booking Experience</h3>
                    <p>Quick and easy space reservations.</p>
                    <h3>Support When You Need It</h3>
                    <p>We're here to assist with any inquiries.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopSection;
