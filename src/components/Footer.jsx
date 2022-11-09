import React from 'react';

const Footer = () => {
  return (
    <div className='pt-10 pb-16 bg-red-800 flex flex-col text-center gap-y-5 text-2xl font-semibold'>
      <div className=''>
        <span>Made with the API of </span>
        <a className='border-2 border-blue-800 rounded-md' href='https://www.themoviedb.org'  target="_blank" rel="noreferrer">The Movie Db</a>
      </div>
      <div>
        <span>Programmed by </span>
        <a className='border-2 border-blue-400 rounded-md' href='https://germangab1781.github.io/Portfolio/'  target="_blank" rel="noreferrer">Germán Gabriel</a>
      </div>
    </div>
  );
}

export default Footer;
