import React, { useEffect, useState, useRef } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { contractAddresses, abi } from "../constants";
import { ContractTransaction, ContractReceipt } from "ethers";
import { ethToWei } from "../utils/eth";
import { trpc } from "../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  DonationFormValues,
  donationFormSchema,
} from "../schema/donation.schema";

interface DonateFormProps {
  causeId: string;
}

export const DonateForm = ({
  causeId = "clacqgl200000wgfm7auw50p9",
}: DonateFormProps) => {
  // amount is stored in wei form (1 eth = 10^18 wei)

  const [result, setResult] = useState<string>("");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
  });

  const amount = watch("amount");
  const sendReceipt = watch("sendReceipt");
  const anon = watch("anon");

  const { mutate } = trpc.donation.addDonation.useMutation();

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId: string = parseInt(chainIdHex!).toString();
  const contractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const { runContractFunction: makeDonation } = useWeb3Contract({
    contractAddress: contractAddress,
    abi: abi,
    functionName: "donate",
    params: {},
    msgValue: ethToWei(amount),
  });

  const onSubmit: SubmitHandler<DonationFormValues> = async (formData) => {
    const donationResult = await makeDonation({
      onError: (error) => {
        setResult(`error: ${JSON.stringify(error)}`);
      },
      onSuccess: async (tx) => {
        setResult(`Donations pending...`);
        const txReceipt = await (tx as ContractTransaction).wait(1);
        if (txReceipt?.events![0]?.event === "DonationMade") {
          await recordDonation(txReceipt, formData);
        }
      },
    });
  };

  const recordDonation = async (
    txReceipt: ContractReceipt,
    formData: DonationFormValues
  ) => {
    const extra = {
      address: txReceipt.from,
      causeId: causeId,
    };
    const args = Object.assign(extra, formData);
    mutate(args);
    setResult(`Donation successful!`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Enter Amount" {...register("amount")} />
        <span className="">ETH</span>
        {errors.amount && <p>{errors.amount.message}</p>}

        <br />
        <br />

        {/* Anon */}
        <input type="checkbox" {...register("anon")} />
        <label className="pl-2" htmlFor="anonymous">
          <span>Anonymous Donation</span>
          <br />
          {anon ? (
            <span className="text-sm">
              Your wallet address will not be displayed
            </span>
          ) : (
            <span className="text-sm">
              Your wallet address will be displayed
            </span>
          )}
        </label>

        <br />
        <br />
        <input
          type="text"
          placeholder="Display Name (optional)"
          {...register("displayName")}
        />

        <br />
        <input
          type="text"
          placeholder="Message (optional)"
          {...register("message")}
        />

        <br />
        <br />
        <input type="checkbox" {...register("sendReceipt")} />
        <label className="pl-2" htmlFor="sendReceipt">
          <span>Get a Receipt</span>
        </label>

        {/* Send Email Receipt */}
        {sendReceipt && (
          <div>
            <span className="text-sm">
              Name and Email are required to receive a donation receipt.
            </span>
            <br />

            <input
              type="text"
              placeholder="Billing Name"
              {...register("name", { shouldUnregister: true })}
            />
            {errors.name && <p>{errors.name.message}</p>}
            <br />
            <input
              type="text"
              placeholder="Billing Email"
              {...register("email", { shouldUnregister: true })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        )}

        <br />
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Donate
        </button>
      </form>
      {result && <p>{result}</p>}
    </>
  );
};

export default DonateForm;
