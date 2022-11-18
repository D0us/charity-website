import React from "react";
import { trpc } from "../../utils/trpc";
import CauseCard from "./CauseCard";

// interface Cause {
//   id: string;
//   name: string;
//   description: string;
//   address: string;
// }
// type causes = Cause[];

export const CauseList = () => {
  const causes = trpc.cause.getAll.useQuery();

  if (!causes.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="py-20 px-10 md:px-20">
      {causes.data.map((cause) => {
        return <CauseCard key={cause.id} cause={cause} />;
      })}
    </div>
  );
};
