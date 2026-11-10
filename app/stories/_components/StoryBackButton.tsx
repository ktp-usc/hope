"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import styles from "./HistoricalStoryTemplate.module.css";

export default function StoryBackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/our-work");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={styles.historyLink}
      aria-label="Go back to previous page"
    >
      <ArrowLeft size={18} aria-hidden="true" />
      Back
    </button>
  );
}

