import React from 'react';

const styles = {
  InputStyle:
    'flex bg-[#FFFFFF] italic normal px-4 text-[#1D498BAB] rounded-md w-[312px] h-[48px]',
};

const FormInput = ({ handleChange, lable, ...otherProps }) => {
  return (
    <div className='p-2 px-3 bg-black'>
      <input
        className={styles.InputStyle}
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
