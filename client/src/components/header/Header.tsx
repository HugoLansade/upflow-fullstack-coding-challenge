import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Header.css"

export default function Header() {
    return (
        <nav id='darth-blue-rectangle'>
             <div className="left">
                 <span className="link" >States</span>
                 <span className="link" >My work</span>

                {/* <NavLink className="link"  to="/">
                    States
                </NavLink>
                <NavLink className="link"  to="/mywork">
                    My work
                </NavLink> */}
            </div>
            <div className="right">
                <a href="https://upflow.io/fr/" id='upflow-logo'> <img src="./../../img/upflow-logo.svg" alt="upflow-logo"/></a>           
            </div>
        </nav>
    )
}
//./../../img/upflow-log.svg