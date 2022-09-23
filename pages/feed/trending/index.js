import React from 'react';
import axios from 'axios';
import FeedComponent from '../../../components/feedComponent/feed.component';

const Trending = ({ topics }) => {
  return (
    <div>
      <div>Top Today</div>
      <div>Top Last 7d</div>
      <div>Top Last 30d</div>

      <FeedComponent key={topics.topic_id} topics={topics} />
    </div>
  );
};

export default Trending;
export async function getServerSideProps() {
  const response = await axios(`${process.env.API_PATH}/api/topics`);

  return {
    props: {
      topics: response.data,
      
    },
  };
}
