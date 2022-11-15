import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract, useNativeBalance } from "react-moralis";
import { contractAddresses, abi } from "../constants";
import { ethers, BigNumber } from "ethers";
import { RecentDonations } from "./RecentDonations";

/*
TODO:
    - figure out how to get the contract balance
    -figure out best way to get the recent donations - event tracking or store in local db?
*/
export const CauseDetails = () => {
  const [donators, setDonators] = useState<string[] | undefined>(undefined);
  const [donees, setDonees] = useState<string[]>(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);

  useEffect(() => {
    const update = async () => {
      await updateUi();
    };
    update();
  }, []);

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId: string = parseInt(chainIdHex!).toString();
  const contractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const { runContractFunction: balanceOf } = useWeb3Contract({
    contractAddress: contractAddress,
    abi: abi,
    functionName: "balanceOf",
    params: {},
    msgValue: "",
  });

  const { runContractFunction: getDonees } = useWeb3Contract({
    contractAddress: contractAddress,
    abi: abi,
    functionName: "getRecipients",
    params: {},
    msgValue: "",
  });

  const updateUi = async () => {
    await balanceOf({
      onSuccess: async (result) => {
        // console.log(result);
        const balance = result as BigNumber;
        setBalance(balance.toString());
      },
      onError: (error) => {
        console.log(error);
      },
    });
    await getDonees({
      onSuccess: async (result) => {
        setDonees(result as string[]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <p>
        Contract Balance:{" "}
        {!balance ? <span>...</span> : ethers.utils.formatEther(balance)} ETH
      </p>
      <p>Goal: 1000ETH</p>
      <p>Recipients: {!donees ? <span>...</span> : donees.length}</p>
      <DoneesList donees={donees} />
      <h2>Recent Donations:</h2>
      <RecentDonations />
    </>
  );
};

export default CauseDetails;

interface DoneesListProps {
  donees: string[];
}
export const DoneesList = ({ donees }: DoneesListProps) => {
  if (!donees) {
    return <span>...</span>;
  }
  return (
    <>
      <h2>Donees:</h2>
      <ul>
        {donees.map((donee) => (
          <li>{donee}</li>
        ))}
      </ul>
    </>
  );
};
