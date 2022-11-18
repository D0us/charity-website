import React from "react";
import CauseCard from "../components/Cause/CauseCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Test = () => {
  return (
    <div className="">
      <ToastContainer />
      <button className="bg-black p-10" onClick={() => toast("Test")}>
        Toast
      </button>
    </div>
  );
};

export default Test;
