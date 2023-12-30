import React from "react";
import Breadcrumb from "../../../components/partial/Breadcumb";


const ServerError = () =>{

     return (
          <>
              <Breadcrumb title={'Server Error'}></Breadcrumb>
               <div className="row">
                   <div className="col-lg-12">
                         <h3 className="text-danger">Something went Wrong !</h3>
                   </div>
               </div>

          </>
     );
};

export default ServerError;