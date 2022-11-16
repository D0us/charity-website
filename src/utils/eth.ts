import { ethers } from "ethers";

// TODO: Maybe use a generic here
export const ethToWei = (amount: Number | String) => {
  if (!amount) {
    return "0";
  }
  return ethers.utils.parseEther(amount.toString()).toString();
};
