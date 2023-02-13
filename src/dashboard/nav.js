import React from "react";


import Cookies from "js-cookie";

const logout = () => {
    Cookies.remove('token')
}

function NavBar() {

	//title page
    document.title = "NavBar - Administrator Travel GIS";

    return(
        <React.Fragment>
                <nav className="navbar navbar-expand-lg bg-primary">
  <div className="container">
    <a className="navbar-brand text-light" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active text-light" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" onClickCapture={logout} href="#">logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>



        </React.Fragment>
    )

}

export default NavBar