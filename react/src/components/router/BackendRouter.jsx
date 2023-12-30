import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from '../modules/Dashboard';
import AllUser from '../modules/AllUser';
import Master from '../layout/Master';
import NotFound from "../modules/errors/NotFound";
import ServerError from "../modules/errors/ServerError";
import AddCategory from "../modules/category/AddCategory";
import AllCategory from "../modules/category/AllCategory";

const BackendRouter = createBrowserRouter([
     {
          path: '/',
          element : <Master/>,
          children : [
               {
                    path:'/',
                    element: <Dashboard/>
               
               },
               {
                    path:'/category/create',
                    element: <AddCategory/>
               
               },
               {
                    path:'/category/index',
                    element: <AllCategory/>
               
               },
               {
                    path:'/all-user',
                    element: <AllUser/>
               
               },
               {
                    path:'/not-founds',
                    element: <NotFound/>
               
               },
               {
                    path:'/server-errors',
                    element: <ServerError/>
               
               }
          ]
     }
])

export default BackendRouter;