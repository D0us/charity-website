import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { createDoneeSchema } from "../../../schema/donee.schema";

export const doneeRouter = router({
  addDonee: publicProcedure
    .input(createDoneeSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.donee.create({
        data: {
          name: input.name,
          Wallet: {
            create: [{ address: input.walletAddress }],
          },
        },
      });
    }),
});
