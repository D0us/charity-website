import React from "react";
import { useRouter } from "next/router";
import CauseDetails from "../../components/CauseDetails";
import DonateForm from "../../components/DonateForm";
import { RecentDonations } from "../../components/RecentDonations";
import Head from "next/head";
import Header from "../../components/Header";
import { getPageStaticInfo } from "next/dist/build/analysis/get-page-static-info";
import { trpc } from "../../utils/trpc";
import { Context } from "../../server/trpc/context";
import { GetStaticPropsContext } from "next";
import { Cause } from "@prisma/client";
import { Data } from "web3uikit";

interface CauseCardProps {
  causeId: string;
}
export const Donate = ({ causeId }: CauseCardProps) => {
  const router = useRouter();
  const { slug } = router.query;

  let cause;
  if (slug) {
    cause = trpc.cause.getBySlug.useQuery({ slug: slug });
  }

  if (!cause) {
    return <div>Loading...</div>;
  }
  if (!cause.data) {
    return <div>404 this</div>;
  }
  return (
    <>
      {causeId}
      <Head>
        <title>Charity</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <DonatePage cause={cause.data} />
    </>
  );
};

export default Donate;

interface DonatePageProps {
  cause: Cause;
}
export const DonatePage = ({ cause }: DonatePageProps) => {
  return (
    <div className="m-10 flex flex-col items-center justify-center space-y-4 p-10">
      <h2 className="py-4 text-2xl"></h2>
      {/* <h1>{cause.data.}</h1> */}
      <CauseDetails />
      <div className="flex flex-col space-x-12 md:flex-row">
        <div className="md:w-2/3">
          <DonateForm />
        </div>
        <RecentDonations />
      </div>
    </div>
  );
};
