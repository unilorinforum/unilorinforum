import BannerComponent from '../components/bannerComponent/banner.component';
import BottomNavComponent from '../components/bottomNavComponent/bottomNav.component';
import NewPostButtonComponent from '../components/commonComponents/newPostButton.component';
import Header from '../components/headerComponent/header.component';
import LeftSideBarComponent from '../components/sideBarComponent/leftSide.component';
import RightSideBarComponent from '../components/sideBarComponent/rightSideBar.component';
import { AuthProvider } from '../context/authProvider';
import '../config/axios';
import Router, {useRouter}  from 'next/router';
import { useEffect, useState } from 'react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
const MyRouter = useRouter()
useEffect(() => {
   localStorage.setItem('UF_USER_FIRST_PAGE', JSON.stringify(Router.asPath));
}, []);
  
  if (Component.getLayout) {
    return Component.getLayout(
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
  return (
    <AuthProvider>
      <div className=''>
        <div className='w-screen'>
          <Header />
          <BannerComponent />
        </div>
        <div className='flex'>
          <div>
            <Component {...pageProps} />
            <div>
              <BottomNavComponent />
            </div>
          </div>
          <LeftSideBarComponent />
        </div>
      </div>
    </AuthProvider>
  );
}

export default MyApp;
