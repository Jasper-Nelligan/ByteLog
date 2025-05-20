import type { FrontendPost } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMonthlyPostCounts(posts: FrontendPost[] | undefined) {
  const currentYear = new Date().getFullYear();
  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(currentYear, i).toLocaleString("en-US", { month: "long" })
  );

  const monthlyCounts: Record<string, number> = {};
  monthNames.forEach(month => {
    monthlyCounts[month] = 0;
  });

  if (posts && posts.length > 0) {
    posts.forEach(post => {
      const date = new Date(post.createdAt);
      const postYear = date.getFullYear();
      if (postYear === currentYear) {
        const month = date.toLocaleString("en-US", { month: "long" });
        monthlyCounts[month] = (monthlyCounts[month] ?? 0) + 1;
      }
    });
  }

  const result = monthNames.map(month => ({
    month,
    postCount: monthlyCounts[month],
  }));

  return result;
}

export function getTopWords(posts: FrontendPost[] | undefined, topN = 5): { word: string; count: number }[] {
  if (!posts || posts.length === 0) return [];
  
  const wordCounts = new Map<string, number>();

  posts.forEach(post => {
    const cleaned = post.message
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // remove punctuation
      .split(/\s+/); // split by whitespace

    cleaned.forEach(word => {
      if (word) {
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      }
    });
  });

  return Array.from(wordCounts.entries())
    .sort(([, aCount], [, bCount]) => bCount - aCount)
    .slice(0, topN)
    .map(([word, count]) => ({ word, count }));
}


