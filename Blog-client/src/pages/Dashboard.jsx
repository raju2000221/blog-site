import React from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashProfile from '../components/DashProfile';

const Dashboard = () => {
    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className="">
                <DashboardSidebar/>
            </div>
            <DashProfile/>
        </div>
    );
};

export default Dashboard;