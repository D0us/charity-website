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
    <div className="m-10 flex flex-col items-center justify-center space-y-4 rounded-md border p-10">
      <h2 className="py-4 text-2xl">{cause.data.name}</h2>
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

export default CauseCard;
