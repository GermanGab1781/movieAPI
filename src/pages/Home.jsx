import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { NavLink } from 'react-router-dom';
import Calification from '../components/Calification';
import { motion } from 'framer-motion';

export default function Home() {

  const [moviesList, setMoviesList] = useState(undefined);
  useEffect(()=>{
    window.scrollTo(0, 0);
    const endPoint= 'https://api.themoviedb.org/3/movie/popular?api_key=1ce52f5f95a2acce305a563bd35c19ec&language=en-US&page=1'
    axios.get(endPoint)
      .then(res=>{
        setMoviesList(res.data.results)
      })
      .catch(err=>{
        Swal.fire({icon:'error',title:{err}})
      })

  },[setMoviesList])
  return (
    <div className=''>
      <>
        {moviesList === undefined && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='bg-slate-400 w-screen h-screen'><span className='text-3xl m-auto'>LOADING</span></motion.div>}
        {(moviesList && moviesList.length === 0) && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='bg-slate-400 w-screen h-screen'><span className='text-3xl m-auto'>Nothing found</span></motion.div>}
      </>
      {moviesList &&
        
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}  className='text-center flex flex-col pt-16'>
          <span className='xl:text-6xl text-4xl m-3 p-5 bg-slate-700 rounded-md'>Welcome to the best Movies Page</span>
          <span className='text-3xl font-semibold mx-5 mt-10 border-t border-b py-3 text-slate-900'>20 MOST POPULAR</span>
          {console.log(moviesList)}
          <div className='flex flex-wrap place-content-center gap-5 p-5 m-5 bg-slate-900 rounded-md'>
          {moviesList.map((movie,index)=>{
            let detailPath = "/Movie/"+movie.id
            return(
              <NavLink to={detailPath}  className='flex flex-col cursor-pointer relative group h-fit w-fit border border-blue-700' key={index}>
                <span className='font-bold group-hover:scale-110 group-hover:text-white m-auto h-fit w-60 transition-all ease-in-out delay-75'>{movie.title}</span>
                <img className='h-60 w-60' alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                <span className='absolute bottom-0 font-bold h-60 w-60 group-hover:bg-white group-hover:text-slate-900 group-hover:bg-opacity-90 group-hover:opacity-100 opacity-0 overflow-hidden transition-all ease-in-out delay-75'>{movie.overview}</span>                   
                <Calification vote={movie.vote_average}/>
              </NavLink>
            )
          })}
          </div>
        </motion.div>
      }
    </div>
  )
}
