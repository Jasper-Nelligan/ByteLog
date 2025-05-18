// app/page.tsx or another RSC file (NO "use client")
import { HydrateClient, api } from "@/trpc/server";
import ClientHome from "@/components/clientHome";

export default async function HomePage() {
  await api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <ClientHome />
    </HydrateClient>
  );
}
