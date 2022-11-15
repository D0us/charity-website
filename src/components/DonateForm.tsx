import React, { useEffect, useState, useRef } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import Header from "../components/Header";
import { contractAddresses, abi } from "../constants";
import { ethers, ContractTransaction } from "ethers";
import { trpc } from "../utils/trpc";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateDonationValues,
  CreateDonationSchema,
} from "../schema/donation.schema";

interface DonateFormProps {}

export const DonateForm = ({}: DonateFormProps) => {
  // amount is stored in wei form (1 eth = 10^18 wei)

  const [result, setResult] = useState<string>("");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDonationValues>({
    resolver: zodResolver(CreateDonationSchema),
  });

  const amount = watch("amount");
  const sendReceipt = watch("sendReceipt");
  const anon = watch("anon");

  const { mutate } = trpc.donation.addDonation.useMutation();

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId: string = parseInt(chainIdHex!).toString();
  const contractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const ethToWei = (amount: Number | String) => {
    if (!amount) {
      return "0";
    }
    return ethers.utils.parseEther(amount.toString()).toString();
  };

  const { runContractFunction: makeDonation } = useWeb3Contract({
    contractAddress: contractAddress,
    abi: abi,
    functionName: "donate",
    params: {},
    msgValue: ethToWei(amount),
  });

  const onSubmit: SubmitHandler<CreateDonationValues> = async (data) => {
    console.log(`submit data: ${JSON.stringify(data)}`);

    const donationResult = await makeDonation({
      onError: (error) => {
        setResult(`error: ${JSON.stringify(error)}`);
      },
      onSuccess: async (tx) => {
        setResult(`Donations pending...`);
        (tx as ContractTransaction).wait(1).then((receipt) => {
          console.log(receipt);
          if (receipt?.events![0]?.event === "DonationMade") {
            mutate({
              /* Todo:
              1. get actual address
              2. get cause dynamically
              */
              amount: ethToWei(amount),
              address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              causeId: "clacqgl200000wgfm7auw50p9",
            });
            setResult(`Donation successful!`);
          }
        });
      },
    });
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
