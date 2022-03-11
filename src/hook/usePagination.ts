
// import {  useState } from 'react'

import { useState } from "react"



export const usePagination = (porPagina:number) => {
  const [pagination, setPagination] = useState({
    TotalPages: 1,
    startPage:0
  });


  const setTotalPage = ( number:number )=>{
    setPagination(prev => ({
      ...prev,
      TotalPages: Math.ceil( number / porPagina )
    }))
  } 

  const moverPage = ( n:number ) => {
    setPagination(prev => ({
      ...prev,
      startPage: prev.startPage + n
    }))
  } 

  const { TotalPages ,startPage } =pagination

  return {
    perPage:porPagina,
   TotalPages,
    startPage,


    setTotalPage,
    moverPage
  }
  


}
