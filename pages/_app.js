import BannerComponent from '../components/bannerComponent/banner.component';
import Header from '../components/headerComponent/header.component';
import LeftSideBarComponent from '../components/sideBarComponent/leftSide.component';
import RightSideBarComponent from '../components/sideBarComponent/rightSideBar.component';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  if(Component.getLayout){
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <div className=''>
      <div className='w-screen'>
        <Header />
        <BannerComponent />
      </div>
      <div className='flex'>
        <RightSideBarComponent />
        <div>
          <Component {...pageProps} />
        </div>
        <LeftSideBarComponent />
      </div>
    </div>
    
  );
}

export default MyApp;