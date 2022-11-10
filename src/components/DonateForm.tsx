import React, { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import Header from "../components/Header";
import { contractAddresses, abi } from "../constants";
import { ethers, ContractTransaction } from "ethers";
import { trpc } from "../utils/trpc";

interface DonateFormProps {}

export const DonateForm = ({}: DonateFormProps) => {
  const [amount, setAmount] = useState<string>();
  const [result, setResult] = useState<string | null>(null);

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
    msgValue: amount?.toString(),
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
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
              amount: ethers.utils.parseEther(amount!).toBigInt(),
              address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            });
            setResult(`Donation successful!`);
          }
        });
      },
    });
  };

  return (
    <>
      <form onSubmit={async (e) => handleSubmit(e)}>
        <input
          type="text"
          name="amount"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <span className="">ETH</span>
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
