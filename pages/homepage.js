import React, { Component } from 'react';
import FeedComponent from '../components/feedComponent/feed.component';
import { useSession } from 'next-auth/react';

const Homepage = () =>{
  const { data: Session } = useSession()
  return(
<div className=''>
       <FeedComponent />
       {Session ? 'oo' : '5050'}
      </div>
  )
}

export default Homepage;