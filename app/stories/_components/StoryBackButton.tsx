"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/**
 * Client-side back button that returns to the previous history entry or falls back to /our-work.
 */
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
      className="mt-9 inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2.5 rounded-[40px] border border-[#7aaff4] bg-white px-6 py-2.5 font-[inherit] text-base font-bold text-[#075bce] no-underline transition-[background-color,border-color] duration-200 hover:border-[#1665dc] hover:bg-[#e7f2ff] focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-[#111b31] max-[800px]:mt-7 max-[400px]:px-[18px] max-[400px]:text-sm"
      aria-label="Go back to previous page"
    >
      <ArrowLeft size={18} aria-hidden="true" />
      Back
    </button>
  );
}
