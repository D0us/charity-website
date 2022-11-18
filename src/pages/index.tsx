import { type NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMoralis } from "react-moralis";

import { trpc } from "../utils/trpc";
import { RecentDonations } from "../components/RecentDonations";

const Home: NextPage = () => {
  const { isWeb3Enabled } = useMoralis();

  const handleDonationClick = (e: Event) => {
    if (!isWeb3Enabled) {
      e.preventDefault();
      alert("Please connect your wallet");
    }
  };
  return (
    <>
      <Head>
        <title>Charity</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="">
        <Header />
        <main className="">
          {/* Hero */}
          <section className="flex flex-col items-center justify-center bg-light py-32">
            <h1 className="text-6xl">Donate Now</h1>
            <p className="pt-2 text-xl">
              Help people directly through decentralised charity
            </p>

            <div className="flex flex-row space-x-6 pt-6">
              <Link onClick={(e) => handleDonationClick(e)} href="/causes">
                <button className="btn btn-primary">Donate</button>
              </Link>

              <Link href="/donee-signup">
                <button className="btn btn-primary">Receive</button>
              </Link>
            </div>
          </section>

          <section className="flex w-full flex-row items-center justify-center bg-egg py-8 text-black">
            <div className="flex flex-col space-y-4">
              <h2 className="items-left text-2xl font-bold">
                Recent Donations
              </h2>
              <RecentDonations showCause={true} />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
