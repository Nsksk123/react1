//import hook react
import React, { useState } from "react";

//import BASE URL API
import Api from "../../api";

//import toats
import toast from "react-hot-toast";

//import js cookie
import Cookies from "js-cookie";

//import react router dom
import { useHistory, Redirect } from "react-router-dom";

function Login() {

	//title page
    document.title = "Login - Administrator Travel GIS";

    //state user
    const [id_card, setid_card] = useState("");
    const [password, setPassword] = useState("");

    //state loading
    const [isLoading, setLoading] = useState(false);

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const history = useHistory();

    //function "loginHandler"
    const loginHandler = async (e) => {
        e.preventDefault();

        //set state isLoading to "true"
        setLoading(true);

            await Api.post("/api/v1/auth/login", {
                    id_card: id_card,
                    password: password,
                })
            .then((response) => {
                //set state isLoading to "false"
                setLoading(false);

                //show toast
                toast.success("Login Successfully.", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });

                //set cookie
                Cookies.set("token", response.data.token);

                //redirect dashboard page
                history.push("/admin/dashboard");
            })
            .catch((error) => {
                //set state isLoading to "false"
                setLoading(false);

                //set error response validasi to state "validation"
                setValidation(error.response.data);
            });
    };

    if (Cookies.get("token")) {
        //redirect dashboard page
        return <Redirect to="/admin/dashboard"></Redirect>;
    }


    return (
        <React.Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 mt-150">
                        <div className="text-center mb-4">
                            <h4><i className="fa fa-map-marked-alt"></i> <strong>Vaksin</strong></h4>
                        </div>
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <div className="text-center">
                                    <h6 className="fw-bold">LOGIN ADMIN</h6>
                                    <hr />
                                </div>
                                {validation.message && (
                                    <div className="alert alert-danger">
                                        {validation.message}
                                    </div>
                                )}
                                <form onSubmit={loginHandler}>

                                    <label className="mb-1">ID CARD</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                        <input type="text" className="form-control" value={id_card} onChange={(e) => setid_card(e.target.value)} placeholder="ID Card" />
                                    </div>
                                    {validation.id_card && (
                                        <div className="alert alert-danger">
                                            {validation.id_card[0]}
                                        </div>
                                    )}

                                    <label className="mb-1">PASSWORD</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    </div>
                                    {validation.password && (
                                        <div className="alert alert-danger">
                                            {validation.password[0]}
                                        </div>
                                    )}

                                    <button className="btn btn-success shadow-sm rounded-sm px-4 w-100" type="submit" disabled={isLoading}> {isLoading ? "LOADING..." : "LOGIN"} </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default Login;