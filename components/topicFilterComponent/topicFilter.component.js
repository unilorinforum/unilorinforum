import React from 'react';

const styles = {
  spanItem:
    'topic-filter-items rounded-full  cursor-pointer  py-1 whitespace-nowrap flex flex-wrap px-4 text-[#002D72] font-bold  bg-[#CED5E0] ',
};

const TopicFilterComponent = () => {
  return (
    <div className='border-b bg-[#ffffff] pl-3 py-3 mt-0 md:hidden flex no-scrollbar overflow-x-auto w-screen max-w-[800px] space-x-4 '>
      <span className={styles.spanItem}>For You</span>
      <span className={styles.spanItem}>Latest</span>
      <span className={styles.spanItem}>Trending</span>
      <span className={styles.spanItem}>Gist</span>
      <span className={styles.spanItem}>Just In</span>
      <span className={styles.spanItem}>Education</span>
      <span className={styles.spanItem}>Education</span>
      <span className={styles.spanItem}>Education</span>
      <span className={styles.spanItem}>Education</span>
      <span className={styles.spanItem}>Education</span>
      <span className={styles.spanItem}>Education</span>
      <span className={styles.spanItem}>Education</span>
      <span className={styles.spanItem}>Education</span>
    </div>
  );
};

export default TopicFilterComponent;
