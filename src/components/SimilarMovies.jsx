import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SimilarMovies({movies}) {
  return (
    <div className='border-yellow-400 border-2'>
      <span className='text-2xl font-semibold'>Similar movies</span>
      <div className='flex flex-row flex-wrap place-content-center '>
        {movies.results.map((movie,index)=>{
          if(index < 9){
            let detailPath = "/Movie/"+movie.id
            return(
              <NavLink className='group relative hover:scale-150 hover:z-30 z-10 transition-all delay-75 duration-150' to={detailPath} key={index}>
                <img className='h-28 w-28' alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                <>{/* calification color */}
                  {movie.vote_average >= 6 && 
                  <div className='bg-green-500 h-10 w-10 absolute bottom-0 m-auto group-hover:opacity-100 opacity-0 transition-all ease-in-out delay-75 duration-150'>
                    <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-white font-bold'>{movie.vote_average}</span>
                  </div>}
                  {(movie.vote_average < 6 && movie.vote_average > 4) &&
                  <div className='bg-yellow-500 h-10 w-10 absolute bottom-0 m-auto group-hover:opacity-100 opacity-0 transition-all ease-in-out delay-75 duration-150'>
                    <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-white font-bold'>{movie.vote_average}</span>
                  </div>}
                  {movie.vote_average < 4 && 
                  <div className='bg-red-500 h-10 w-10 absolute bottom-0 m-auto group-hover:opacity-100 opacity-0 transition-all ease-in-out delay-75 duration-150'>
                    <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-white font-bold'>{movie.vote_average}</span>
                  </div>}
                </>
              </NavLink>
            )
          }
          return(<></>)
        })}
      </div>
    </div>
  )
}
