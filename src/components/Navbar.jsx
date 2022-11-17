import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();

  const submitSearch = e =>{
    e.preventDefault()
    const query = e.currentTarget.query.value
    if (query.length === 0){
      Swal.fire({icon:'error',title:'Write something'})
    }else{
      navigate(`../Search/${query}/1`)
    }
  }

  return (
    <div className='fixed w-screen z-50 flex flex-row p-4 bg-slate-900 place-content-between font-Oswald'>
      <NavLink to='/' className='font-bold text-xl'>THE MOVIES API</NavLink>
      <form onSubmit={submitSearch} className='absolute -translate-x-1/2 left-1/2'>
        <input name='query' type='text'/>
        <button className='ml-2'>Search</button>
      </form>
    </div>
  );
}

export default Navbar;
