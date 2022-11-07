import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const params = useParams()
  const [movie, setMovie] = useState(undefined);
  useEffect(()=>{
    const keyword = params.id
    axios.get(`https://api.themoviedb.org/3/movie/${keyword}?api_key=1ce52f5f95a2acce305a563bd35c19ec&language=en-US`)
      .then((res)=>{
        setMovie(res.data.results)
        console.log(`https://api.themoviedb.org/3/movie/${keyword}?api_key=1ce52f5f95a2acce305a563bd35c19ec&language=en-US`)
      }).catch((err)=>{
        console.log(err)
      })
  },[params,setMovie])

  return (
    <div>
      <>
        {movie === undefined && <div>CARGANDO</div>}
        {(movie && movie.length === 0) && <div>NO HAY NADA</div>}
      </>
      {movie && 
        <div>
          {movie.title}
        </div>      
      }
    </div>
  );
}

export default Detail;
