import { useMemo } from "react";
import { trpc } from "../utils/trpc";
import { ethers } from "ethers";

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
  const donations = trpc.donation.getRecent.useQuery({ causeId: causeId });

  if (!donations.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {/* Todo: fix this any
        https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
        */}
        {donations.data.map((donation: any) => {
          console.log(donation);
          return (
            <li key={donation.id}>
              {showCause && donation.Cause.name}
              {donation.createdAt.toDateString()} - {donation.address} -{" "}
              {ethers.utils.formatEther(donation.amount)} ETH
            </li>
          );
        })}
      </ul>
    </div>
  );
};
