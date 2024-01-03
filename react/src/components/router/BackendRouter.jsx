import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from '../modules/Dashboard';
import AllUser from '../modules/AllUser';
import Master from '../layout/Master';
import NotFound from "../modules/errors/NotFound";
import ServerError from "../modules/errors/ServerError";
import AddCategory from "../modules/category/AddCategory";
import AllCategory from "../modules/category/AllCategory";
import EditCategory from "../modules/category/EditCategory";
import AddSubCategory from "../modules/subcategory/AddSubcategory";
import EditSubCategory from "../modules/subcategory/EditSubCategory";
import AllSubCategory from "../modules/subcategory/AllSubCategory";
import AddBrand from "../modules/brand/AddBrand";
import EditBrand from "../modules/brand/EditBrand";
import AllBrand from "../modules/brand/AllBrand";

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
                    path:'/category/edit/:id',
                    element: <EditCategory/>
               
               },
               {
                    path:'/category/index',
                    element: <AllCategory/>
               
               },
               {
                    path:'/sub-category/create',
                    element: <AddSubCategory/>
               
               },
               {
                    path:'/sub-category/edit/:id',
                    element: <EditSubCategory/>
               
               },
               {
                    path:'/sub-category/index',
                    element: <AllSubCategory/>
               
               },
               {
                    path:'/brand/create',
                    element: <AddBrand/>
               
               },
               {
                    path:'/brand/edit/:id',
                    element: <EditBrand/>
               
               },
               {
                    path:'/brand/index',
                    element: <AllBrand/>
               
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