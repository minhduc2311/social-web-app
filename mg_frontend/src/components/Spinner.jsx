import React from "react";
import { ColorRing } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <ColorRing
        height="80"
        width="80"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        className="m-5"
      />

      <div className="text-lg text-center px-2">{message}</div>
    </div>
  );
};

export default Spinner;
