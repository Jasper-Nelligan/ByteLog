import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";

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
        <p>{message}</p>
      </CardContent>
    </Card>
  )
}