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
      <div className="px-24">
        <Header />
        <main className="container mx-auto flex min-h-full flex-col items-center justify-center p-4">
          <section className="pt-10">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl">Lorem Ipsum</h1>
              <p className="pt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </section>

          <section>
            <div className="flex flex-row items-center justify-center space-x-4 py-12">
              <Link onClick={(e) => handleDonationClick(e)} href="/donate">
                <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                  Donate
                </button>
              </Link>

              <Link href="/donee-signup">
                <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                  Receive
                </button>
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-xl">Recent Donations</h2>
            <RecentDonations showCause={true} />
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
