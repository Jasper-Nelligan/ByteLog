import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object(
      { title: z.string().min(1), message: z.string().min(1), createdAt: z.date() }
    ))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title,
          message: input.message,
          createdAt: input.createdAt,
          userId: "mockUser",
        },
      });
    }),

  getByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: { userId: input.userId },
        orderBy: { createdAt: "desc" },
      });
    }),

});
