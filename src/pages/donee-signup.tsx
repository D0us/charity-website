import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { CreateDoneeValues, createDoneeSchema } from "../schema/donee.schema";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";

/**
 * @dev Users can sign up to be a donee
 */
export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDoneeValues>({
    resolver: zodResolver(createDoneeSchema),
  });

  const { mutate, error } = trpc.donee.addDonee.useMutation({
    onSuccess: () => {
      console.log("Successfully added donee");
    },
    onError: (error) => {
      console.log(`Error adding donee: ${error}`);
    },
  });

  const onSubmit = (values: CreateDoneeValues) => {
    mutate(values);
  };
  return (
    <>
      <Head>
        <title>Charity</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="px-24">
        <Header />

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl">Sign up to be a donee </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
            <input
              type="hidden"
              {...register("causeId")}
              value="clacqgl200000wgfm7auw50p9"
            />
            <input
              {...register("name")}
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Last Name"
            />
            {errors.name?.message && errors.name?.message}
            <br />
            <input
              {...register("walletAddress")}
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Wallet address"
            />
            {errors.walletAddress?.message && errors.walletAddress?.message}
            <br />
            <button type="submit" className="btn btn-blue">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
