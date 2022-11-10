import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreateDoneeValues, createDoneeSchema } from "../schema/donee.schema";
import { trpc } from "../utils/trpc";

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
      console.log("Successfully added user");
    },
  });

  const onSubmit = (values: CreateDoneeValues) => {
    mutate(values);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl">Sign up to be a donee </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
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
    </>
  );
};

export default Signup;
