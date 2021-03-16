import React from "react";
import {Link} from 'react-router-dom'
import CartLink from './Cart/CartLink'
import logo from '../assets/logo.svg'
import { UserContext } from "../context/user";
import LoginLink from '../components/LoginLink'

export default function Header() {
  const {user}= React.useContext(UserContext)
  return (
    <header className="header">
      <img src={logo} alt="vintage tech logo" className="logo"/>
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
              {user.token && <li>
                <Link to="/checkout"></Link>
                </li>}
          </div>
          <div>
           
            <CartLink/>
            <LoginLink/>

          </div>
        </ul>
      </nav>
    </header>
  )
}
