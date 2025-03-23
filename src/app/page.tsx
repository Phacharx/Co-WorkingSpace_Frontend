import Image from "next/image";
import styles from "./page.module.css";
import TopSection from "@/components/TopSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <TopSection />
    </main>
  );
}
