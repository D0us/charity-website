import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import { CauseList } from "../components/Cause/CauseList";

export const Causes = () => {
  return (
    <>
      <Head>
        <title>Charity</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="px-24">
        <Header />
      </div>
      <main>
        <CauseList />
      </main>
    </>
  );
};

export default Causes;
