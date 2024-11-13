import React from "react";
import { PulseLoader } from "react-spinners";

const Loader = ({ height }) => {
  return (
    <div className={`${height} flex justify-center items-center flex-col`}>
      <PulseLoader size={20} color="#06b6d4"></PulseLoader>
    </div>
  );
};

export default Loader;
