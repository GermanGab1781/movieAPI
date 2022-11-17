import axios from 'axios';
import { motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Calification from '../components/Calification';
import Pagination from '../components/Pagination';

const Search = () => {
  const params = useParams()
  const [movies, setMovies] = useState(undefined)
  const [pagesNumber, setPagesNumber] = useState(undefined)
  const [currentPage, setCurrentPage] = useState(undefined)
  const [previousPage,setPreviousPage] = useState(undefined)
  const [nextPage,setNextPage] = useState(undefined)
  
  useEffect(()=>{
    window.scrollTo(0, 0);
    const query = params.id
    const page = params.page
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1ce52f5f95a2acce305a563bd35c19ec&language=en-US&query=${query}&page=${page}&include_adult=false&region=a`)
      .then((res)=>{
        setMovies(res.data)
        setPagesNumber(res.data.total_pages)
        setCurrentPage(res.data.page)
        setNextPage("/Search/"+query+"/"+(res.data.page+1))
        setPreviousPage("/Search/"+query+"/"+(res.data.page-1))
        console.log(res.data)
      })
  },[params])
  return (
    <div>
      <>
      {movies === undefined && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='h-screen w-screen'>Loading</motion.div>}
      {(movies && movies.total_results === 0) && 
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='h-screen text-center text-black'>
          <span className='absolute left-1/2 top-1/3 transform -translate-x-1/2 text-3xl'>
          NO SEARCH RESULTS PLEASE SEARCH ANOTHER MOVIE
          </span>
        </motion.div>}
      </>
      {(movies && movies.total_results > 0) &&
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <div className='flex flex-col pt-16 place-items-center'>
            <span>Search for : "{params.id}"</span>
            <span>{movies.total_results} results and {movies.total_pages} pages</span>
            <Pagination query={params.id} pagesNumber={pagesNumber} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} />
          </div>
          <div className='flex flex-wrap place-content-center gap-5 p-5 m-5 bg-slate-900 rounded-md text-center'>
            {movies.results.map((movie,index)=>{
              let detailPath = "/Movie/"+movie.id
              return(
                <NavLink to={detailPath}  className='flex flex-col cursor-pointer relative group h-fit w-fit border border-blue-700' key={index}>
                  <span className='font-bold group-hover:scale-110 group-hover:text-white m-auto h-fit w-60 transition-all ease-in-out delay-75'>{movie.title}</span>
                  <img className='h-60 w-60' alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                  <span className='absolute bottom-0 font-bold h-60 w-60 group-hover:bg-white group-hover:bg-opacity-70 group-hover:opacity-100 opacity-0 overflow-hidden transition-all ease-in-out delay-75'>{movie.overview}</span>    
                  <Calification vote={movie.vote_average}/>
                </NavLink>
              )
            })}
          </div>
          <Pagination query={params.id} pagesNumber={pagesNumber} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} />
        </motion.div>
      }
    </div>
  );
}

export default Search;
