import * as z from "zod";
import { router, publicProcedure } from "../trpc";
import { donationSchema } from "../../../schema/donation.schema";

export const donationRouter = router({
  addDonation: publicProcedure
    .input(donationSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.donation.create({
        data: {
          amount: input.amount,
          address: input.address,
        },
      });
    }),
});
