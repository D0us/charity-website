import * as z from "zod";
import { router, publicProcedure } from "../trpc";

export const causeRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const causes = await ctx.prisma.cause.findMany();
    return causes;
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const cause = await ctx.prisma.cause.findUnique({
        where: { id: input.id },
      });
      return cause;
    }),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const cause = await ctx.prisma.cause.findUnique({
        where: { slug: input.slug },
      });
      if (!cause) {
        throw new Error("Cause not found");
      }
      return cause;
    }),
});
