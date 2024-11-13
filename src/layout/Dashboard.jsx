import React from 'react';
import Sidebar from '../components/shared/Sidebar';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <div className="relative min-h-screen md:flex">
          <Sidebar />
          <div className="flex-1  md:ml-64 dark:bg-gray-700 bg-white">
            <div className="p-5 ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;