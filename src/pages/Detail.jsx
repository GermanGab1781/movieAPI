import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SimilarMovies from '../components/SimilarMovies';

const Detail = () => {
  const params = useParams()
  const [movie, setMovie] = useState(undefined)
  const [similarMovies,setSimilarMovies] = useState(undefined)

  useEffect(()=>{
    window.scrollTo(0, 0);
    const keyword = params.id
    axios.get(`https://api.themoviedb.org/3/movie/${keyword}?api_key=1ce52f5f95a2acce305a563bd35c19ec&language=en-US`)
      .then((res)=>{
        setMovie(res.data)
        console.log(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    axios.get(`https://api.themoviedb.org/3/movie/${keyword}/similar?api_key=1ce52f5f95a2acce305a563bd35c19ec&language=en-US&page=1`)
      .then((res)=>{
        setSimilarMovies(res.data)
        console.log(res.data)
      })
  },[params,setMovie,setSimilarMovies])

  return (
    <div className=' pb-32'>
      <>
        {(movie === undefined || similarMovies === undefined) && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='bg-slate-900 w-screen h-screen'><span className='text-3xl m-auto'>LOADING</span></motion.div>}
        {(movie && movie.length === 0) && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='bg-slate-900 w-screen h-screen'><span className='text-3xl m-auto'>Nothing found</span></motion.div>}
      </>
      {(movie  && similarMovies) &&
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='flex flex-col relative place-items-center m-auto pt-16 bg-slate-900 w-1/2 gap-y-5 text-center'>  
          {/* Title and Home Button */}        
          <span className='text-6xl text-center text-yellow-400 w-3/4'>{movie.title}</span>
          <NavLink to='/' className='absolute left-0 py-3 font-bold text-3xl mx-2'>{"<--"}<br/><span className='text-xl'>Home</span></NavLink>
          {/* Movie Details */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='flex flex-row gap-x-3 justify-between mt-5'>
            <img className='h-96 w-60' alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>            
            <div className='flex flex-col gap-y-3 w-full h-full text-xl font-semibold'>
              {/* Calification */}
              <>
                {movie.vote_average >= 6 && 
                <div className='bg-green-500 h-24 w-24 relative'>
                  <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white font-bold'>{movie.vote_average}</span>
                  <span className='absolute bottom-1 left-1/2 transform -translate-x-1/2 text-sm text-stone-300 font-bold'>Votes:{movie.vote_count}</span>
                </div>}
                {(movie.vote_average < 6 && movie.vote_average > 4) &&
                <div className='bg-yellow-500 h-24 w-24 relative'>
                  <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white font-bold'>{movie.vote_average}</span>
                  <span className='absolute bottom-1 left-1/2 transform -translate-x-1/2 text-sm text-stone-300 font-bold'>Votes:{movie.vote_count}</span>
                </div>}
                {movie.vote_average < 4 && 
                <div className='bg-red-500 h-24 w-24 relative'>
                  <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white font-bold'>{movie.vote_average}</span>
                  <span className='absolute bottom-1 left-1/2 transform -translate-x-1/2 text-sm text-stone-300 font-bold'>Votes:{movie.vote_count}</span>
                </div>}
              </>
              <span className='flex flex-wrap'>Original Title: <span className='font-normal text-base underline'>{movie.original_title}</span></span>
              <span className='flex flex-wrap'>Genre/s: 
                {movie.genres.map((genre,index)=>{
                  return(
                    <span className='underline ml-2 my-auto font-normal text-base' key={index}>{genre.name}</span>
                  )
                })}
              </span>
              <span className='flex flex-wrap'>Release Date: <span className='font-normal text-base underline my-auto'>{movie.release_date}</span></span>
              <span className='flex flex-wrap'>Production companies: 
                {movie.production_companies.map((company,index)=>{
                  return(
                    <span className='underline ml-2 my-auto font-normal text-base' key={index}>{company.name}</span>
                  )
                })}
              </span>
              <span className='flex flex-wrap'>Production countries: 
              {movie.production_countries.map((country,index)=>{
                return(
                  <span className='underline ml-2 my-auto font-normal text-base' key={index}>{country.name}</span>
                )
              })}
              </span>            
            </div>
          </motion.div>
          {/* Overview */}
          <div className='flex flex-col w-4/5 m-auto'>
            <span className='text-center font-bold text-3xl'>Overview</span>
            <span className='border border-red-200'>{movie.overview}</span>
          </div>
          <SimilarMovies movies={similarMovies}/>
        </motion.div>      
      }
    </div>
  );
}

export default Detail;
