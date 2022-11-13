import * as z from "zod";
import { BigNumber } from "ethers";

export const donationSchema = z.object({
  amount: z.string(),
  address: z.string().length(42),
  causeId: z.string(),
});

export type DonationValues = z.TypeOf<typeof donationSchema>;
