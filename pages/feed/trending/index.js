import React from 'react';
import axios from 'axios';
import TopicCardComponent from '../../../components/topicCardComponent/topicCard.component';
import TopicFilterComponent from '../../../components/topicFilterComponent/topicFilter.component';
const styles =
  ' topic-filter-items rounded-sm  cursor-pointer  py-1 whitespace-nowrap flex flex-wrap px-4 text-[#002D72] font-bold  bg-[#CED5E0] ';

const Trending = ({ topics }) => {
  return (
    <div>
      <TopicFilterComponent />
      <div className='border-b bg-[#ffffff] pl-3 py-3 mt-0  flex no-scrollbar overflow-x-auto w-screen max-w-[800px] space-x-4'>
        <div className={styles}>Today</div>
        <div className={styles}>Last 7d</div>
        <div className={styles}>Last 30d</div>
        <div className={styles}>This Week</div>
        <div className={styles}>This Month</div>
        <div className={styles}>This Semester</div>
      </div>

      {topics.map((topic) => {
        return (
          <div key={topic.topic_id}>
            <TopicCardComponent topic={topic} />
          </div>
        );
      })}
    </div>
  );
};

export default Trending;
export async function getServerSideProps() {
  const response = await axios(`/topics`);

  return {
    props: {
      topics: response.data.topics,
    },
  };
}
