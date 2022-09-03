import React from 'react';
import { FcHome } from 'react-icons/fc';

const styles = {
  style: 'text-lg',
};
 
const RightSideBarComponent = () => {
  return (
    <div className=' ml-9 min-w-[150px] hidden md:flex md:flex-col space-y-2 h-[500px] items-center w-[200px] border-x-2s'>
      <ul className='space-y-4 font-bold mt-10'>
        <li className={styles.style}>Home</li>
        <li className={styles.style}>PDFs</li>
        <li className={styles.style}>Gossips</li>
        <li className={styles.style}>Friction</li>
        <li className={styles.style}>Videos</li>
        <li className={styles.style}>Users</li>
        <li className={styles.style}>Rules</li>
        <li className={styles.style}>login</li>
        <li className={styles.style}>register</li>
        <li className={styles.style}>Profile</li>
      </ul>
      <hr className='border-2 min-w-full' />
      <div className='   whitespace-nowrap'>
        <ul className='text-center space-y-2 font-bold mt-2'>
          <li>Code of conduct</li>
          <li>Write and get paid</li>
          <li>How to register</li>
          <li>How to login</li>
          <li>How to create a topic</li>
          <li>How to post pdf/materia</li>
          <li>How to Post a Gist</li>
          <li>How to Post a Gist</li>
        </ul>
      </div>
    </div>
  );
};

export default RightSideBarComponent;
