import React from 'react';
import { NavLink} from 'react-router-dom';

const Pagination = ({query,currentPage,pagesNumber,nextPage,previousPage}) => {
  return (
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
            let pathPage= "/Search/"+query+"/"+(index+1)
            return (<NavLink to={pathPage} key={index} className='w-6 h-fit p-1 m-2 bg-red-900 text-center'>{index+1}</NavLink>);
          }
        }else{
          let newRange= [(pagesNumber - 9),pagesNumber]
          if((currentPage === index+1))   {
            return(<span key={index} className='cursor-default w-6 h-fit p-1 m-2 bg-green-500 text-center'>{index+1}</span>);
          }
          if((index+1 >= newRange[0] && index+1 <= newRange[1])){
            let pathPage= "/Search/"+query+"/"+(index+1)
            return (<NavLink to={pathPage} key={index} className='w-6 h-fit p-1 m-2 bg-red-900 text-center'>{index+1}</NavLink>);    
          }                                                    
        }
        }
      )}
      {(currentPage === pagesNumber) && <span className='w-6 h-fit font-bold p-1 m-2 bg-slate-300 text-center pointer-events-none'>{">"}</span>}
      {(currentPage !== pagesNumber) && <NavLink to={nextPage} className='w-6 h-fit font-bold p-1 m-2 bg-red-900 text-center'>{">"}</NavLink>}
    </div>
  );
}

export default Pagination;
