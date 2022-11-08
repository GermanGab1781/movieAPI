import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Search = () => {
  const params = useParams()
  const [movies, setMovies] = useState(undefined)
  const [pagesNumber, setPagesNumber] = useState(undefined)
  const [currentPage, setCurrentPage] = useState(undefined)
  const [previousPage,setPreviousPage] = useState(undefined)
  const [nextPage,setNextPage] = useState(undefined)
  
  useEffect(()=>{
    const query = params.id
    const page = params.page
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1ce52f5f95a2acce305a563bd35c19ec&language=en-US&query=${query}&page=${page}&include_adult=false&region=a`)
      .then((res)=>{
        setMovies(res.data)
        setPagesNumber(res.data.total_pages)
        setCurrentPage(res.data.page)
        setNextPage("/Search/"+query+"/"+(res.data.page+1))
        setPreviousPage("/Search/"+query+"/"+(res.data.page-1))
      })
  },[params])
  return (
    <div>
      <>
      {movies === undefined && <div>Loading</div>}
      {(movies && movies.length === 0) && <div>NO SEARCH RESULTS PLEASE SEARCH ANOTHER MOVIE</div>}
      </>
      {movies && 
        <div>
          <div className='flex flex-col place-items-center'>
            <span>Search for : "{params.id}"</span>
            <span>{movies.total_results} results and {movies.total_pages} pages</span>
            <div className='flex flex-row flex-wrap'>
              {(currentPage === 1) && <span  className='w-6 h-fit font-bold p-1 m-2 bg-slate-300 text-center pointer-events-none'>{"<"}</span>}
              {(currentPage !== 1) && <NavLink to={previousPage} className='w-6 h-fit font-bold p-1 m-2 bg-red-900 text-center'>{"<"}</NavLink>}
              {[...Array(pagesNumber)].map((page,index) => {
                let range= [currentPage, currentPage+9]

                if((currentPage+9) <= (pagesNumber)){
                  if((index+1 === range[0])){
                    return(<span key={index} className='cursor-default w-6 h-fit p-1 m-2 bg-green-500 text-center'>{index+1}</span>);
                  }
                  if((index+1 >= range[0] && index+1 <= range[1])){
                    let pathPage= "/Search/"+params.id+"/"+(index+1)
                    return (<NavLink to={pathPage} key={index} className='w-6 h-fit p-1 m-2 bg-red-900 text-center'>{index+1}</NavLink>);
                  }
                }else{
                  let newRange= [(pagesNumber - 9),pagesNumber]
                  if((currentPage === index+1))   {
                    return(<span key={index} className='cursor-default w-6 h-fit p-1 m-2 bg-green-500 text-center'>{index+1}</span>);
                  }
                  if((index+1 >= newRange[0] && index+1 <= newRange[1])){
                    let pathPage= "/Search/"+params.id+"/"+(index+1)
                    return (<NavLink to={pathPage} key={index} className='w-6 h-fit p-1 m-2 bg-red-900 text-center'>{index+1}</NavLink>);    
                  }                                                    
                }
                }
              )}
              {(currentPage === pagesNumber) && <span className='w-6 h-fit font-bold p-1 m-2 bg-slate-300 text-center pointer-events-none'>{">"}</span>}
              {(currentPage !== pagesNumber) && <NavLink to={nextPage} className='w-6 h-fit font-bold p-1 m-2 bg-red-900 text-center'>{">"}</NavLink>}
            </div>
          </div>
          <div className='flex flex-wrap place-content-center gap-5 p-5 m-5 bg-green-900 border border-red-600 text-center'>
            {movies.results.map((movie,index)=>{
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
          <div className='flex flex-row flex-wrap place-content-center'>
              {(currentPage === 1) && <span  className='w-6 h-fit font-bold p-1 m-2 bg-slate-300 text-center pointer-events-none'>{"<"}</span>}
              {(currentPage !== 1) && <NavLink to={previousPage} className='w-6 h-fit font-bold p-1 m-2 bg-red-900 text-center'>{"<"}</NavLink>}
              {[...Array(pagesNumber)].map((page,index) => {

                let range= [currentPage, currentPage+9]

                if((currentPage+9) <= (pagesNumber)){
                  if((index+1 === range[0])){
                    return(<span key={index} className='cursor-default w-6 h-fit p-1 m-2 bg-green-500 text-center'>{index+1}</span>);
                  }
                  if((index+1 >= range[0] && index+1 <= range[1])){
                    let pathPage= "/Search/"+params.id+"/"+(index+1)
                    return (<NavLink to={pathPage} key={index} className='w-6 h-fit p-1 m-2 bg-red-900 text-center'>{index+1}</NavLink>);
                  }
                }else{
                  let newRange= [(pagesNumber - 9),pagesNumber]
                  if((currentPage === index+1))   {
                    return(<span key={index} className='cursor-default w-6 h-fit p-1 m-2 bg-green-500 text-center'>{index+1}</span>);
                  }
                  if((index+1 >= newRange[0] && index+1 <= newRange[1])){
                    let pathPage= "/Search/"+params.id+"/"+(index+1)
                    return (<NavLink to={pathPage} key={index} className='w-6 h-fit p-1 m-2 bg-red-900 text-center'>{index+1}</NavLink>);    
                  }                                                    
                }
                }
              )}
              {(currentPage === pagesNumber) && <span className='w-6 h-fit font-bold p-1 m-2 bg-slate-300 text-center pointer-events-none'>{">"}</span>}
              {(currentPage !== pagesNumber) && <NavLink to={nextPage} className='w-6 h-fit font-bold p-1 m-2 bg-red-900 text-center'>{">"}</NavLink>}
            </div>
        </div>
      }
    </div>
  );
}

export default Search;
