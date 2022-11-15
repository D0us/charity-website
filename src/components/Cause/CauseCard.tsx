import { DonateForm } from "../DonateForm";
import { CauseDetails } from "../CauseDetails";
import { RecentDonations } from "../RecentDonations";
import { trpc } from "../../utils/trpc";

interface CauseCardProps {
  id: string;
}
const CauseCard = ({ id }: CauseCardProps) => {
  const cause = trpc.cause.get.useQuery({ id: id });

  if (!cause.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col items-center justify-center space-y-4 outline-double outline-indigo-700">
      <h1>{cause.data.name}</h1>
      {/* <h1>{cause.data.}</h1> */}
      <DonateForm />
      <CauseDetails />
    </div>
  );
};

export default CauseCard;
