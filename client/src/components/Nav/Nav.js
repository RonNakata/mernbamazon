import React from "react";
import { Link } from 'react-router-dom';

const Nav = ({loggedIn, logout}) => (

    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/customers">Customers</a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="/manager">Manager</a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="/supervisor">Supervisor</a>
                </li>
                {/* <li class="nav-item">
                <a class="nav-link" href="//codeply.com">Codeply</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li> */}
            </ul>
        </div>
        <div className="mx-auto order-0">
            <a className="navbar-brand mx-auto" href="/">Bamazon</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
                {loggedIn ?
                    <li className="nav-item">
                        <Link className="nav-item nav-link" to="#" onClick={logout}>Logout</Link>
                    </li>
                    :
                    [
                        <li key="signup" className="nav-item">
                            <Link className="nav-item nav-link" to="/signup">Signup</Link>
                        </li>,
                        <li key="login" className="nav-item">
                            <Link className="nav-item nav-link" to="/login">Login</Link>
                        </li>
                    ]
                }
                {/* <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li> */}
            </ul>
        </div>
    </nav>


);

export default Nav;
