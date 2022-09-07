import React, { useState } from 'react';
import axios from 'axios';

const Treanding = () => {

  async function handle(e) {
    e.preventDefault()
    console.log('req nom');
    try {
      const response = await axios.get('/api');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button onClick={handle}>click</button>
      <h1></h1>
    </div>
  );
};

export default Treanding;
