import type { FrontendPost } from "@/types";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { getMonthlyPostCounts, getTopWords } from "@/lib/utils";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const monthlyPostCountConfig = {
  postCount: {
    label: "Posts",
    color: "#5086e9",
  }
} satisfies ChartConfig;

const topWordsConfig = {
  count: {
    label: "Count",
    color: "#5086e9",
  },
} satisfies ChartConfig;


interface AnalyticsProps {
  posts: FrontendPost[] | undefined;
}

export default function Analytics({ posts }: AnalyticsProps) {
  const monthlyPostCountData = getMonthlyPostCounts(posts);
  const topNWords = getTopWords(posts);

  const renderCharts = () => {
    return (
      <div className="flex flex-col items-center justify-center mt-5">
        <p className="text-secondary dark:text-white text-4xl font-semibold mb-5">Posts Per Month</p>
        <ChartContainer config={monthlyPostCountConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={monthlyPostCountData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="postCount" fill={monthlyPostCountConfig.postCount.color} radius={4} />
          </BarChart>
        </ChartContainer>

        <p className="text-secondary dark:text-white text-4xl font-semibold mb-5 mt-5">Top Words Used</p>
        <ChartContainer config={topWordsConfig} className="min-h-[300px] w-full">
          <BarChart
            data={topNWords}
            layout="vertical"
          >
            <XAxis type="number" />
            <YAxis dataKey="word" type="category" />
            <Tooltip />
            <Bar dataKey="count" fill={topWordsConfig.count.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    )
  }

  const renderNoDataAvailable = () => {
    return (
      <div className="flex flex-col items-center justify-center mt-5">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  console.log(posts)

  return (
    <div>
      <p className="text-primary text-4xl font-semibold border-b pb-2">Analytics</p>
      {posts?.length ? renderCharts() : renderNoDataAvailable()}
    </div>
  )
}