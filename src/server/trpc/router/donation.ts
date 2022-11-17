import * as z from "zod";
import { router, publicProcedure } from "../trpc";
import { createDonationSchema } from "../../../schema/donation.schema";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

export const donationRouter = router({
  addDonation: publicProcedure
    .input(createDonationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.sendReceipt) {
          await ctx.prisma.donation.create({
            data: {
              amount: input.amount,
              address: input.address,
              causeId: input.causeId,
              displayName: input.displayName,
              message: input.message,
              anon: input.anon,
              Receipt: {
                create: {
                  email: input.email,
                  name: input.name,
                },
              },
            },
          });
        } else {
          await ctx.prisma.donation.create({
            data: {
              amount: input.amount,
              address: input.address,
              causeId: input.causeId,
              displayName: input.displayName,
              message: input.message,
              anon: input.anon,
            },
          });
        }
      } catch (e: any) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  getRecent: publicProcedure
    .input(z.object({ causeId: z.string().nullish(), page: z.number().min(1) }))
    .query(async ({ input, ctx }) => {
      let args = {};
      const nResultsPerPage = 5;
      if (input.causeId) {
        args = {
          where: { causeId: input.causeId },
          include: { Cause: true },
          orderBy: { createdAt: "desc" },
          take: nResultsPerPage,
          skip: (input.page - 1) * nResultsPerPage,
        };
      } else {
        args = {
          orderBy: { createdAt: "desc" },
          include: { Cause: true },
          take: nResultsPerPage,
          skip: (input.page - 1) * nResultsPerPage,
        };
      }
      try {
        return await ctx.prisma.donation.findMany(args);
      } catch (e: any) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
