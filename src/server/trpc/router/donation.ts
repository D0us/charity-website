import * as z from "zod";
import { router, publicProcedure } from "../trpc";
import { donationSchema } from "../../../schema/donation.schema";
import { Prisma } from "@prisma/client";

export const donationRouter = router({
  addDonation: publicProcedure
    .input(donationSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.donation.create({
        data: {
          amount: input.amount,
          address: input.address,
          causeId: input.causeId,
        },
      });
    }),

  getRecent: publicProcedure
    .input(z.object({ causeId: z.string().nullish() }))
    .query(async ({ input, ctx }) => {
      let args = {};
      if (input.causeId) {
        args = {
          where: { causeId: input.causeId },
          include: { Cause: true },
          orderBy: { createdAt: "desc" },
        };
      } else {
        args = { orderBy: { createdAt: "desc" }, include: { Cause: true } };
      }
      return await ctx.prisma.donation.findMany(args);
    }),
});

export type DonationsWithCause = Prisma.PromiseReturnType<
  typeof donationRouter.getRecent
>;
