import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Productcontext from '../Context/context';
import { useState } from 'react';

function ShopCategroy() {
  let dispatch = useDispatch();
  let {category}=useParams()
  let {value} = useContext(Productcontext)
  let reduxUser = useSelector((state)=> state.use)
  let [user , setUser]  = useState(reduxUser)
  
  useEffect(()=>{
    let checkLogin = async ()=>{
      try {
        let res = await fetch("http://localhost:3000/user/getProfile",{
          method : "GET",
          credentials : "include"
        })
        let data = await res.json();
        if(res.ok && data.user){
          id 
        }

      } catch (error) {
        
      }
    }
  })

  return (
    <div>
      
    </div>
  )
}

export default ShopCategroy
