import React from "react";
import Breadcrumb from "../../../components/partial/Breadcumb";
import {Helmet} from "react-helmet";

const NotFound = () =>{

     return (
          <>

               <Helmet>
                <title>404 Not Found</title>
               </Helmet>
              <Breadcrumb title={'404 Not Found'}></Breadcrumb>
               <div className="row">
                   <div className="col-lg-12">
                         <h3 className="text-danger">Something went Wrong !</h3>
                   </div>
               </div>

          </>
     );
};

export default NotFound;