import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Detail = () => {
  const params = useParams()
  const [movie, setMovie] = useState(undefined);
  useEffect(()=>{
    const keyword = params.id
    axios.get(`https://api.themoviedb.org/3/movie/${keyword}?api_key=1ce52f5f95a2acce305a563bd35c19ec&language=en-US`)
      .then((res)=>{
        setMovie(res.data)
        console.log(res.data)
      }).catch((err)=>{
        console.log(err)
      })
  },[params,setMovie])

  return (
    <div className='bg-red-200 pb-32'>
      <>
        {movie === undefined && <div>CARGANDO</div>}
        {(movie && movie.length === 0) && <div>NO HAY NADA</div>}
      </>
      {movie &&
        <div className='flex flex-col relative place-items-center m-auto bg-red-300 w-1/2 gap-y-5 text-center'>          
          <span className='text-6xl text-center w-3/4'>{movie.title}</span>
          <NavLink to='/' className='absolute left-0 p-3 font-bold text-3xl'>{"<--"}</NavLink>
          <div className='grid place-content-start gap-x-10'>
            <img className='col-start-1 h-96 w-60 m-auto' alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
            
            <div className='col-start-2 flex flex-col w-4/5 m-auto'>
              <>{/* calification color */}
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
              <span className='text-xl font-semibold'>Original Title: <span className='font-normal text-base underline'>{movie.original_title}</span></span>
              <span className='text-xl font-semibold'>Genre/s: 
                {movie.genres.map((genre,index)=>{
                  return(
                    <span className='underline ml-2 font-normal text-base' key={index}>{genre.name}</span>
                  )
                })}
              </span>
              <span className='text-xl font-semibold'>Release Date: <span className='font-normal text-base underline'>{movie.release_date}</span></span>
              <span className='text-xl font-semibold'>Production companies: 
                {movie.production_companies.map((company,index)=>{
                  return(
                    <span className='underline ml-2 font-normal text-base' key={index}>{company.name}</span>
                  )
                })}
              </span>
              <span className='text-xl font-semibold'>Production countries: 
              {movie.production_countries.map((country,index)=>{
                return(
                  <span className='underline ml-2 font-normal text-base' key={index}>{country.name}</span>
                )
              })}
              </span>            
            </div>
          </div>
          <div className='flex flex-col w-4/5 m-auto'>
            <span className='text-center font-bold text-3xl'>Overview</span>
            <span className='border border-red-200'>{movie.overview}</span>
          </div>
        </div>      
      }
    </div>
  );
}

export default Detail;
