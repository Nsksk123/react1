//import react router dom
import { Switch, Route } from "react-router-dom";

//import component private routes
import PrivateRoute from "./PrivateRoutes";

//=======================================================================
//ADMIN
//=======================================================================

//import view Login
import Login from '../pages/admin/Login';

import Request from "../dashboard/request";

import Jajal from "../dashboard/jajal";

import UserEdit from "../dashboard/statusDoctor";

//import view admin Dashboard
import Dashboard from "../dashboard";

import Register from "../dashboard/registrasi";

import Confirmasi from "../dashboard/confirmasi";
function Routes() {
    return (
        <Switch>

            {/* route "/adminlogin" */}
            <Route exact path="/admin/login">
                <Login /> 
            </Route>

            <Route exact path={"/admin/consultations"}>
                <Request/>
            </Route>
            
            <Route exact path={"/admin/jajals"}>
                <Jajal/>
            </Route>

            <Route exact path={"/admin/register"}>
                <Register/>
            </Route>
           
            <PrivateRoute exact path={"/admin/edit/:id"}>
                <Confirmasi></Confirmasi>
            </PrivateRoute>

            {/* private route "/admin/dashboard" */}
            <PrivateRoute exact path="/admin/dashboard">
                <Dashboard /> 
            </PrivateRoute>

        </Switch>
    )
}

export default Routes