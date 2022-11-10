import React from "react";
import Link from "next/link";
import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";

const Header = () => {
  const { isWeb3Enabled } = useMoralis();

  return (
    <div className="flex items-center justify-between py-6">
      <div className="flex w-1/6 items-center">
        <Link href="/">
          <span className="text-2xl">Charity</span>
        </Link>
      </div>
      <div className="flex flex-row space-x-8">
        <Link href="/" className="text-lg text-gray-700 hover:text-black">
          About Us
        </Link>
        <Link href="/" className="text-lg text-gray-700 hover:text-black">
          Our Causes
        </Link>
        <Link href="/" className="text-lg text-gray-700 hover:text-black">
          Stories
        </Link>
        <Link href="/" className="text-lg text-gray-700 hover:text-black">
          Contact
        </Link>
      </div>
      <div className="flex w-1/6 justify-end">
        {/* {!isWeb3Enabled && <span>Please Connect</span>} */}
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
