import React from 'react';
import { ScaleLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div className='flex justify-center items-center h-screen'> 
      <ScaleLoader />
    </div>
  );
}