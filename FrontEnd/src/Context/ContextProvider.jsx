import { useState } from "react";
import Productcontext from "./context";
import React from 'react'
import { useEffect } from "react";
import { setDriver } from "mongoose";

function ContextProvider({childeren}) {
    let [value , setValue] = useState([])
    useEffect(()=>{
        async function getData(){
            try {
                let res = await fetch("http:/localhost:3000/products")
                if(res.status === 200){
                    let data = await res.json()
                    setValue(Array.isArray(data.products)? data.products:[]);
                }else{
                    console.error("Failed to fetch products:" , res.status)
                    setValue([])
                }
            } catch (error) {
                console.error("Network error:" , error)
                setValue([])
            }
        }
        getData()
    },[])
  return (
    <div>
      <Productcontext.Provider value={{value,setValue}}>
        {childeren}
      </Productcontext.Provider>
    </div>
  )
}

export default ContextProvider
