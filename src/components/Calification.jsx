import React from 'react';

const Calification = ({vote}) => {
  return (
    <>{/* calification color */}
      {vote >= 6 && 
      <div className='bg-green-500 h-10 w-10 absolute bottom-0 m-auto group-hover:opacity-30 transition-all ease-in-out delay-75'>
        <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-white font-bold'>{vote}</span>
      </div>}
      {(vote < 6 && vote > 4) &&
      <div className='bg-yellow-500 h-10 w-10 absolute bottom-0 m-auto group-hover:opacity-30 transition-all ease-in-out delay-75'>
        <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-white font-bold'>{vote}</span>
      </div>}
      {vote < 4 && 
      <div className='bg-red-500 h-10 w-10 absolute bottom-0 m-auto group-hover:opacity-30 transition-all ease-in-out delay-75'>
        <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-white font-bold'>{vote}</span>
      </div>}
    </>
  );
}

export default Calification;
