import React from "react";
import {Helmet} from "react-helmet";

const Breadcrumb = (props) =>{

     return (
          <>
          <Helmet>
                <title>{props.title}</title>
          </Helmet>
           <h2 className="mt-4">Dashboard</h2>
               <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">{props.title}</li>
               </ol>
          </>
     );
}
export default Breadcrumb;