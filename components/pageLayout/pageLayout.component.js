import React from 'react';
import Header from '../headerComponent/header.component';
import SideBarComponent from '../sideBarComponent/sideBar.component';

const PageLayoutComponent = ({ children }) => {
  return (
    <div className=''>
      <Header />
      <SideBarComponent />
      <main className='h-[10000px] bg-gray-light'>{children}</main>
    </div>
  );
};

export default PageLayoutComponent;
