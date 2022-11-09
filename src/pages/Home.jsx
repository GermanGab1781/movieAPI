import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { NavLink } from 'react-router-dom';

export default function Home() {

  const [moviesList, setMoviesList] = useState(undefined);
  useEffect(()=>{
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
      {moviesList &&
        
        <div className='text-center flex flex-col pt-16'>
          <span className='text-6xl font-bold border border-red-500 m-3 p-5 bg-red-400'>Welcome to the best Movies Page</span>
          <span className='text-3xl font-semibold border border-green-600 mx-5 mt-10'>TOP 20 MOST POPULAR</span>
          {console.log(moviesList)}
          <div className='flex flex-wrap place-content-center gap-5 p-5 m-5 bg-green-900 border border-red-600'>
          {moviesList.map((movie,index)=>{
            let detailPath = "/Movie/"+movie.id
            return(
              <NavLink to={detailPath}  className='flex flex-col cursor-pointer relative group h-fit w-fit border border-blue-700' key={index}>
                <span className='font-bold group-hover:scale-110 group-hover:text-white m-auto h-fit w-60 transition-all ease-in-out delay-75'>{movie.title}</span>
                <img className='h-60 w-60' alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                <span className='absolute bottom-0 font-bold h-60 w-60 group-hover:bg-white group-hover:bg-opacity-70 group-hover:opacity-100 opacity-0 overflow-hidden transition-all ease-in-out delay-75'>{movie.overview}</span>    
                <>{/* calification color */}
                  {movie.vote_average >= 6 && 
                  <div className='bg-green-500 h-10 w-10 absolute bottom-0 m-auto group-hover:opacity-30 transition-all ease-in-out delay-75'>
                    <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-white font-bold'>{movie.vote_average}</span>
                  </div>}
                  {(movie.vote_average < 6 && movie.vote_average > 4) &&
                  <div className='bg-yellow-500 h-10 w-10 absolute bottom-0 m-auto group-hover:opacity-30 transition-all ease-in-out delay-75'>
                    <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-white font-bold'>{movie.vote_average}</span>
                  </div>}
                  {movie.vote_average < 4 && 
                  <div className='bg-red-500 h-10 w-10 absolute bottom-0 m-auto group-hover:opacity-30 transition-all ease-in-out delay-75'>
                    <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-white font-bold'>{movie.vote_average}</span>
                  </div>}
                </>
              </NavLink>
            )
          })}
          </div>
        </div>
      }
      
      {moviesList === undefined &&
        <div>
          <div>CARGANDO</div>
        </div>
      }
      {(moviesList && moviesList.length === 0) &&
        <div>
          No hay peliculas :P

        </div>
      }
    </div>
  )
}
