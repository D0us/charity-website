import React from "react";
import Image from "next/image";
import Link from "next/link";
import image from "/public/images/1.png";
import { Cause } from "@prisma/client";

interface CauseCardProps {
  cause: Cause;
}
export const CauseCard = ({ cause }: CauseCardProps) => {
  return (
    <Link href={`donate/${cause.slug}`}>
      <div className="flex flex-col space-x-0 space-y-4 rounded-3xl border-black bg-white p-6 md:flex-row md:space-x-4 md:space-y-0">
        <div className="w-100 flex flex-col justify-center md:w-1/3">
          <Image src={image} alt="Cause Image" />
        </div>
        <div className="w-100 md:w-2/3">
          <h1 className="text-2xl font-bold">
            Proident eu sint excepteur mollit officia sunt consequat laborum
            excepteur ea voluptate ipsum.
          </h1>

          <p className="pt-2 text-lg">
            Ipsum cupidatat dolore qui do eiusmod duis consectetur dolor. Fugiat
            consequat aliquip officia eu commodo duis consequat est in aliqua ad
            incididunt exercitation. Eu qui sit dolore nostrud voluptate.
            Occaecat adipisicing culpa deserunt officia officia adipisicing
            tempor ut. Ullamco non exercitation fugiat cupidatat quis sunt nulla
            enim consectetur consequat laborum officia exercitation.
          </p>

          {/* <p className="text-lg font-bold">
                Donate or Sign up to be a beneficiary
            </p> */}
        </div>
      </div>
    </Link>
  );
};

export default CauseCard;
