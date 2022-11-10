import * as z from "zod";

export const createDoneeSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  walletAddress: z.string().length(1, { message: "Invalid Wallet Address" }),
});

export type CreateDoneeValues = z.TypeOf<typeof createDoneeSchema>;
