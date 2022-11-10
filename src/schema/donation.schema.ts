import * as z from "zod";
import { BigNumber } from "ethers";

export const donationSchema = z.object({
  amount: z.bigint(),
  address: z.string().length(42),
});

export type DonationValues = z.TypeOf<typeof donationSchema>;
