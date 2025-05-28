import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface PostProps {
  title: string;
  message: string;
  date: Date;
}

export default function Post({ title, message, date }: PostProps) {
  return (
    <Card className="border border-black">
      <CardHeader className="flex justify-between">
        <CardTitle className="text-xl">{title}</CardTitle>
        <p>{date.toDateString()}</p>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{message}</p>
      </CardContent>
    </Card>
  )
}