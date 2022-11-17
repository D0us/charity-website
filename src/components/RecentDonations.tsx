import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { ethers } from "ethers";
import { Donation, Cause } from "@prisma/client";

interface RecentDonationsProps {
  causeId?: string;
  showCause?: boolean;
}

/**
 * @dev Fetches recent donations from the database
 * @todo Cache this result?
 */
export const RecentDonations = ({
  causeId,
  showCause = false,
}: RecentDonationsProps) => {
  const [page, setPage] = useState(1);

  const donations = trpc.donation.getRecent.useQuery({
    causeId: causeId,
    page: page,
  });

  useEffect(() => {
    donations.refetch();
  }, [page]);

  const paginate = (direction: "next" | "prev") => {
    if (direction === "next") {
      setPage((page) => {
        if (donations.data && donations.data.length < 5) {
          return page;
        }
        return page + 1;
      });
    } else {
      setPage((page) => {
        if (page > 1) {
          return page - 1;
        }
        return page;
      });
    }
  };

  const anonymizeAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!donations.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {/* Todo: fix this any
        https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
        */}
        {donations.data.map((donation: Donation) => {
          return (
            <li key={donation.id}>
              {showCause && donation.Cause.name && " "}
              {donation.createdAt.toDateString()} -{" "}
              <span className="address">
                {donation.anon
                  ? anonymizeAddress(donation.address)
                  : donation.address}
              </span>{" "}
              - {ethers.utils.formatEther(donation.amount)} ETH
              <div className="pl-4">
                {donation.displayName && donation.displayName}
                {donation.message && `: ${donation.message}`}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-row justify-between">
        <button className="btn" onClick={() => paginate("prev")}>
          Prev
        </button>
        <button className="btn" onClick={() => paginate("next")}>
          Next
        </button>
      </div>
    </div>
  );
};
