import React, { useState, useEffect } from "react";
import Productcontext from "./context";

function ContextProvider({ children }) {
  const [value, setValue] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:3000/products");
        if (res.status === 200) {
          const data = await res.json();
          setValue(Array.isArray(data.products) ? data.products : []);
        } else {
          console.error("Failed to fetch products:", res.status);
          setValue([]);
        }
      } catch (error) {
        console.error("Network error:", error);
        setValue([]);
      }
    }
    getData();
  }, []);

  return (
    <Productcontext.Provider value={{ value, setValue }}>
      {children}
    </Productcontext.Provider>
  );
}

export default ContextProvider;
