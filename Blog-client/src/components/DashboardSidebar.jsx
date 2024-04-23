import { Sidebar } from 'flowbite-react';
import React from 'react';
import { HiArrowSmRight, HiUser,} from "react-icons/hi";

const DashboardSidebar = () => {
    return (
        <Sidebar aria-label="Default sidebar example" className='w-full'>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiUser} label="User" labelColor="dark">
              Profile
            </Sidebar.Item>
            <Sidebar.Item  icon={HiArrowSmRight}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    );
};

export default DashboardSidebar;