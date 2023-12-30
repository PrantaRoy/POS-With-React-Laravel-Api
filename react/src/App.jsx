import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './assets/css/styles.css'
import { RouterProvider } from 'react-router-dom'
import BackendRouter from './components/router/BackendRouter'
import PublicRouter from './components/router/PublicRouter';
import {useState} from 'react';
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(0);

  useEffect( ()=>{
    if(localStorage.token != undefined){
      setAuth(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`
    }
  } )
  return (
   
   <>
   {auth ?  <RouterProvider router={BackendRouter}/> : <RouterProvider router={PublicRouter}/>}
      
   </>
  );
}

export default App;
