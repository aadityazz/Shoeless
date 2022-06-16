import React from 'react';
import Link from 'next/link';
import {AiOutlineLogin, AiOutlineProfile, AiOutlineShopping} from 'react-icons/ai'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
        <button type="button" className={"cart-icon"}>
            <AiOutlineLogin/>
        </button>
        <img src="https://raw.githubusercontent.com/aadityazz/ASSETS/main/ShoeLESS.png" className="logo-image"/>
      {/*<p className="logo">*/}
      {/*  <Link href="/">Shoeless</Link>*/}
      {/*</p>*/}


      <button type="button" className="login-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
