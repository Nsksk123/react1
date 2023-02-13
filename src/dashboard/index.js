//import react  
import React from "react";

import Consul from "./Consul";

import NavBar from "./nav";

function Dashboard() {

	//title page
    document.title = "Dashboard - Administrator Travel GIS";

    return(
        <React.Fragment>
            <NavBar></NavBar>
            <div className="row">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-tachometer-alt"></i> Dashboard</span>
                            </div>
                        </div>
                    </div>
                </div>
            <Consul></Consul>
        </React.Fragment>
    )



}

export default Dashboard