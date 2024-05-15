import { Sidebar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiArrowSmRight, HiDocument, HiUser, } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'

const DashboardSidebar = () => {
  const { currentUser } = useSelector((state) => state.user)


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
    <Sidebar aria-label="Default sidebar example" className='w-full'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-2'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'user'} active={tab === 'profile'} labelColor="dark" as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          {
            currentUser.isAdmin &&
            < Link to='/dashboard?tab=post'>
              <Sidebar.Item icon={HiDocument} active={tab === 'post'} as='div'>
                Post
              </Sidebar.Item>
            </Link>
          }
          {
            currentUser.isAdmin &&
            < Link to='/dashboard?tab=user'>
              <Sidebar.Item icon={HiUser} active={tab === 'user'} as='div'>
                User
              </Sidebar.Item>
            </Link>
          }
          {/* <Sidebar.Item  icon={HiArrowSmRight}>
              Sign Out
            </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar >
  );
};

export default DashboardSidebar;