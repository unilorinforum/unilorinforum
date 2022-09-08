import { SessionProvider } from 'next-auth/react';
import BannerComponent from '../components/bannerComponent/banner.component';
import BottomNavComponent from '../components/bottomNavComponent/bottomNav.component';
import Header from '../components/headerComponent/header.component';
import LeftSideBarComponent from '../components/sideBarComponent/leftSide.component';
import RightSideBarComponent from '../components/sideBarComponent/rightSideBar.component';

import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }
  return (
    <SessionProvider session={session}>
      <div className=''>
        <div className='w-screen'>
          <Header />
          <BannerComponent />
        </div>
        <div className='flex'>
          {/* <RightSideBarComponent /> */}
          <div>
            <Component {...pageProps} />
            <div className='flex justify-center items-center focus:'>
              <BottomNavComponent />
            </div>
          </div>
          <LeftSideBarComponent />
        </div>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
