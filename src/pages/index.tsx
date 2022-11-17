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

          <section className="flex flex-row items-center justify-center bg-egg py-8 text-black">
            <div className="flex flex-col space-y-4">
              <h2 className="items-left text-2xl font-bold">
                Recent Donations
              </h2>
              <RecentDonations showCause={true} />
            </div>
          </section>

          {/* <section>
            <div className="flex flex-row space-x-12">
              <div className="basis-1/2">
                <h2 className="text-xl">Our Mission</h2>
                <p className="pt-2 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent consectetur turpis sit amet nibh bibendum, ac
                  eleifend neque vestibulum. Donec malesuada ligula vitae
                  bibendum imperdiet.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Praesent consectetur turpis sit amet nibh
                  bibendum, ac eleifend neque vestibulum. Donec malesuada ligula
                  vitae bibendum imperdiet.
                </p>
              </div>

              <div className="basis-1/2">
                <h2 className="text-xl">History</h2>
                <p className=" pt-2">
                  Aliquam sed est sapien. Donec sodales egestas quam vitae
                  egestas. Cras arcu leo, volutpat eget maximus non, condimentum
                  eu dui. Pellentesque semper nisi ut ante finibus iaculis.
                  Aliquam viverra felis facilisis efficitur condimentum.
                  Pellentesque in interdum augue.
                </p>
                <p className="pt-2">
                  Donec risus nibh, tristique ut ullamcorper quis, finibus nec
                  libero. Nullam mollis quam at sapien lobortis sodales. Nullam
                  molestie mauris erat, nec suscipit enim cursus ac. Nam vel
                  placerat sem. Aenean non nisi pretium, molestie ante et,
                  rhoncus augue. Nunc ac enim eu arcu consectetur gravida. Donec
                  venenatis sodales aliquam. Pellentesque pretium sapien id
                  blandit sollicitudin. Integer ac lacus at lorem fermentum
                  lacinia vehicula eget nisi. Aliquam eu bibendum odio, eget
                  lacinia dui. Integer ac pretium ex, non imperdiet ante.
                </p>
              </div>
            </div>
          </section> */}
        </main>
      </div>
    </>
  );
};

export default Home;
