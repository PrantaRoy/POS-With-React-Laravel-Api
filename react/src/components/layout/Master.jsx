import React from "react";
import Nav from "../partial/Nav"
import SideBar from "../partial/SideBar"
import Footer from "../partial/Footer"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import '../../assets/css/styles.css'
import { Outlet } from "react-router-dom";

const Master = () => {
     return (
          <>
          <Nav/>
          <div id="layoutSidenav">
            <SideBar/>
            <div id="layoutSidenav_content">
            <main>
                        <div className="container-fluid px-4">
                            <Outlet/>
                        </div>
                    </main>
              <Footer/>
            </div>
          </div>
       </>
     );
};

export default Master;