import React from "react";
import Link from "next/link";
import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";

const Header = () => {
  const { isWeb3Enabled } = useMoralis();

  return (
    <div className="flex items-center justify-between bg-primary py-6 px-14 text-egg hover:text-white">
      <div className="flex w-1/6 items-center">
        <Link href="/">
          <span className="text-2xl">SafetyNet</span>
        </Link>
      </div>
      <div className="flex flex-row space-x-8">
        <Link href="/" className="text-lg">
          About Us
        </Link>
        <Link href="/causes" className="text-lg">
          Our Causes
        </Link>
        <Link href="/" className="text-lg">
          Stories
        </Link>
        <Link href="/" className="text-lg">
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
