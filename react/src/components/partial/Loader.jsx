import React from "react";
import loader from "./../../assets/images/loader.gif"

const Loader = () => {
     return (
          <div >
               <img src={loader} alt={'loader'} className="w-25"/>
          </div>
     );
};

export default Loader;