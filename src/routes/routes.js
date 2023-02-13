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

//import view admin Dashboard
import Dashboard from "../dashboard";

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

            {/* private route "/admin/dashboard" */}
            <PrivateRoute exact path="/admin/dashboard">
                <Dashboard /> 
            </PrivateRoute>

        </Switch>
    )
}

export default Routes