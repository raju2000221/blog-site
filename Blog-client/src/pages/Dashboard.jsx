import React, { useEffect, useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashProfile from '../components/DashProfile';
import { useLocation } from 'react-router-dom';
import DashPost from '../components/DashPost';

const Dashboard = () => {
    const location = useLocation();
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className="">
                <DashboardSidebar/>
            </div>
            { tab === 'profile' && <DashProfile/>}
            { tab === 'post' && <DashPost/>}
        </div>
    );
};

export default Dashboard;