import * as z from "zod";
import { BigNumber } from "ethers";

/**
 * @dev Donation form with email and billing for receipt
 */
export const createDonationWithReceiptSchema = z.object({
  amount: z.string().transform(Number),
  // address: z.string().length(42),
  // causeId: z.string(),
  sendReceipt: z.literal(true),
  email: z.string().email({ message: "Must be a valid email" }),
  name: z.string().min(1, { message: "Required" }),
  displayName: z
    .string()
    .max(90, { message: "Display name must be less than 90 characters" })
    .optional(),
  message: z
    .string()
    .max(280, { message: "Message must be less than 280 characters" })
    .optional(),
  anon: z.boolean().default(false),
});

/**
 * @dev Default donation form with no email receipt, no billing
 *     .min(1 / 10 ** 18, { message: "Amount must be greater than 1 wei" }),

 */
export const createDonationWithoutReceiptSchema = z.object({
  amount: z.string().transform(Number),
  // address: z.string().length(42),
  // causeId: z.string(),
  sendReceipt: z.literal(false),
  displayName: z
    .string()
    .max(90, { message: "Display name must be less than 90 characters" })
    .optional(),
  message: z
    .string()
    .max(280, { message: "Message must be less than 280 characters" })
    .optional(),
  anon: z.boolean().default(false),
});

export const CreateDonationSchema = z.discriminatedUnion("sendReceipt", [
  createDonationWithReceiptSchema,
  createDonationWithoutReceiptSchema,
]);

export type CreateDonationValues = z.TypeOf<typeof CreateDonationSchema>;
