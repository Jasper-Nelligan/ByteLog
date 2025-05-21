import { HydrateClient, api } from "@/trpc/server";
import ClientHome from "@/components/clientHome";

export default async function HomePage() {
  await api.post.getByUser.prefetch({ userId: "mockUser" });

  return (
    <HydrateClient>
      <ClientHome />
    </HydrateClient>
  );
}
