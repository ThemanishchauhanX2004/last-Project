import { useEffect } from "react";
import { useState } from "react";

export function AdminPanel(){
    let [products , setProducts] = useState([])
    let [nweProducts , setNewProducts] = useState({
         Name : "",
         price : "",
         description : "",
         image : [],
         count : 0,
         category : "Men"
    })
   let fetchProduct = async ()=>{
    try {
        let res = await fetch("http://localhost:3000/products")
        data = await res.json()
        setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
        console.log("Error fetching products" , error)
    }
   }
useEffect(()=>{
fetchProduct()
},[])
return(
<div style={{padding:"20px"}}>
    <h1> Admin Panel - Product Management</h1>
    <tbody>
       <thead>
         <tr>
            <th>Image</th>
              <th>Name</th>
                <th>Price()</th>
                  <th>Description</th>
                    <th>Count</th>
                      <th>Category</th>
                        <th>Actions</th>
        </tr>
       </thead>
    </tbody>
{products.length > 0 ? (
    products.map((p)=>{
      <tr key={p._id}>
        <td>
            <input
            type="text"
             value={p.productsImage}
            />
        </td>
        <td>
            <input
            type="text"
             value={p.productsNamw}
            />
        </td>
        <td>
            <input
            type="text"
             value={p.productsPrice}
            />
        </td>
        <td>
            <input
            type="text"
             value={p.description}
            />
        </td>
        <td>
            <input
            type="text"
             value={p.productsCount}
            />
        </td>
        <td>
            <select value={p.productsCategory}>
                <option></option>
            </select>
        </td>
      </tr>
    })
):(
    <tr>
        <td  colSpan={7}>
            No products found
        </td>
    </tr>
)}
</div>
)
}