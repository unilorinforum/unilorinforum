import Head from 'next/head';
import React from 'react';
import Header from '../components/headerComponent/header.component';
import NewTopicComponent from '../components/newTopicComponent/newTopic.component';

const NewTopic = () => {
  return (
    <div>
      <NewTopicComponent />
    </div>
  );
}

export default NewTopic;

 NewTopic.getLayout = function pageLayout(page) {
   return (
     <>
       {/* <Header /> */}
       {page}
     </>
   );
 };
