import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract, useNativeBalance } from "react-moralis";
import { contractAddresses, abi } from "../constants";

/*
TODO:
    - figure out how to get the contract balance
    -figure out best way to get the recent donations - event tracking or store in local db?
*/
export const CauseDetails = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [donators, setDonators] = useState<string[] | null>(null);

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

  const { runContractFunction: getDonators } = useWeb3Contract({
    contractAddress: contractAddress,
    abi: abi,
    functionName: "getDonators",
    params: {},
    msgValue: "",
  });

  const { runContractFunction: getDonation } = useWeb3Contract({
    contractAddress: contractAddress,
    abi: abi,
    functionName: "getDonation",
    params: {},
    msgValue: "",
  });

  const updateUi = async () => {
    await getDonators({
      onError: (error) => {
        console.log(`getDonators ${error}`);
      },
      onSuccess: async (result) => {
        const donators = result as string[];
        // console.log(`getDonators result: ${result}`);
        setDonators(donators);
        // await getInvididualDonations(donators);
      },
      onComplete: () => {
        console.log(`getDonators complete`);
      },
    });
  };

  return (
    <div>
      <p>Contract Balance: {balance}</p>
      <h1>Recent Donations</h1>
      <ul>
        {donators?.map((donator, i) => {
          return <li key={i}>{donator}</li>;
        })}
      </ul>
    </div>
  );
};

export default CauseDetails;
