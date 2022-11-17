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
  causeId?: string;
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
        {/* Amount */}
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            className="input-text"
            placeholder="Enter Amount"
            {...register("amount")}
          />
          {/* <span className="">ETH</span> */}
          {errors.amount && (
            <p className="error-text">{errors.amount.message}</p>
          )}
        </div>

        {/* Display Name */}
        <div className="pt-3">
          <label htmlFor="displayName" className="label">
            Display Name
          </label>
          <input
            type="text"
            className="input-text"
            placeholder="Display Name"
            {...register("displayName")}
          />
        </div>

        {/* Message  */}
        <div className="pt-3">
          <label htmlFor="message" className="label">
            Message
          </label>
          <input
            type="text"
            className="input-text"
            placeholder="Say something nice!"
            {...register("message")}
          />
        </div>

        {/* Receipt */}
        <div className="pt-2">
          <input type="checkbox" {...register("sendReceipt")} />
          <label className="label  pl-2" htmlFor="sendReceipt">
            <span>Get a Receipt</span>
          </label>
        </div>

        {/* Send Email Receipt */}
        {sendReceipt && (
          <div>
            {/* <p className="label text-sm">
              Name and Email are required to receive a donation receipt.
            </p> */}

            <div className="">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="input-text"
                placeholder="Billing Name"
                {...register("name", { shouldUnregister: true })}
              />
              {errors.name && (
                <p className="error-text">{errors.name.message}</p>
              )}
            </div>

            <div className="pt-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="input-text"
                placeholder="Billing Email"
                {...register("email", { shouldUnregister: true })}
              />
              {errors.email && (
                <p className="error-text">{errors.email.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Anon */}
        <div className="pt-2">
          <input type="checkbox" {...register("anon")} />
          <label className="label pl-2" htmlFor="anonymous">
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
        </div>

        <button type="submit" className="btn btn-primary mt-6">
          Donate
        </button>
      </form>
      {result && <p>{result}</p>}
    </>
  );
};

export default DonateForm;
