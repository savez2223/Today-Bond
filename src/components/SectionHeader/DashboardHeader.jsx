import React from 'react';

const DashboardHeader = ({title}) => {
    return (
      <div>
        <h3 className="text-lg md:text-2xl font-medium text-blue-400 dark:text-white border-b-2 pb-2">
          {title}
        </h3>
      </div>
    );
};

export default DashboardHeader;