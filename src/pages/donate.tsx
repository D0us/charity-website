import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import Header from "../components/Header";
import { DonateForm } from "../components/DonateForm";
import { CauseDetails } from "../components/CauseDetails";

interface Cause {
  name: string;
  description: string;
  address: string;
}
type causes = Cause[];

export const Donate = () => {
  const causes: causes = [
    {
      name: "Save the Children",
      description: "Save the Children is a global charity",
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
  ];

  return (
    <>
      <Header />
      <h1>Donate</h1>
      <div>
        {causes.map((cause, i) => {
          return <CauseCard key={i} cause={cause} />;
        })}
      </div>
    </>
  );
};

export default Donate;

interface CauseCardProps {
  cause: Cause;
}
const CauseCard = ({ cause }: CauseCardProps) => {
  return (
    <div className=" flex flex-col items-center justify-center space-y-4 outline-double outline-indigo-700">
      <h1>{cause.name}</h1>
      <h1>{cause.description}</h1>
      <DonateForm />
      <CauseDetails />
    </div>
  );
};
