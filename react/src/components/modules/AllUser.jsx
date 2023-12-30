import React from "react";
import Breadcrumb from "../partial/Breadcumb";
import {Helmet} from "react-helmet";
const AllUser = () => {
     return (
          <>
          <Helmet>
                <title>All User List</title>
          </Helmet>
          <Breadcrumb title={'All User'}></Breadcrumb>
              
          </>
     );
};

export default AllUser;