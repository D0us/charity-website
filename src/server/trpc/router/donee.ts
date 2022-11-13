import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { createDoneeSchema } from "../../../schema/donee.schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

export const doneeRouter = router({
  addDonee: publicProcedure
    .input(createDoneeSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const donee = await ctx.prisma.donee.create({
          data: {
            name: input.name,
            causeId: input.causeId,
            Wallet: {
              create: [{ address: input.walletAddress }],
            },
          },
        });
        return donee;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Wallet address already exists",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
