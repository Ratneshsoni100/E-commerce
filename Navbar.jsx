import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { authUser } from "../Context/context";
function Navbar() {
  let user = authUser();
  // console.log("user in nav ", user);
  let { condata } = user;

// navigate to homepage
let navigate = useNavigate()

  let onLogout = () =>{
    user.logout()
navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1162/1162456.png"
            height="55"
            width="70"
            alt=""
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

{
  condata.isLoggedIn===false ?
  <li className="nav-item">
  <NavLink to="/">Login</NavLink>
</li>
: 
''
}
         
       {
        condata.isLoggedIn===false ?
        <li className="nav-item">
        <NavLink to="/register">Register</NavLink>
      </li>
      : 
      ''
       }

            {condata.isLoggedIn === true ? (
              <li className="nav-item">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            ) : (
              ""
            )}

            
{condata.isLoggedIn === true ? (
              <li className="nav-item">
                <NavLink to="/store">Store</NavLink>
              </li>
            ) : (
              ""
            )}

        {
          condata.isLoggedIn === true ? 
          (
            <li className="nav-item">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user?.condata?.userName}
              </button>
              <ul className="dropdown-menu">
                <li className="">
                  <button
                    onClick={onLogout}
                    className="btn btn-danger w-100"
                  >
                    LOGOUT
                  </button>
                </li>
              </ul>
            </div>
          </li>
          )
          :
          ''
        }

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
