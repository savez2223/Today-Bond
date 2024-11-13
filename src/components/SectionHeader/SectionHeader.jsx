import React from "react";

const SectionHeader = ({ heading }) => {
  return (
    <div>
      <div className=" text-center md:w-4/12 mx-auto py-10 ">
        <h3 className="font-noNotoSerif font-semibold md:text-4xl text-xl dark:text-white text-gray-900 md:py-4 uppercase">
          {heading}
        </h3>
      </div>
    </div>
  );
};

export default SectionHeader;
