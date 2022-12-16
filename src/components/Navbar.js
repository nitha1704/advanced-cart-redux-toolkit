import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/advanced-cart-slice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  return (
    <NavbarStyled>
      <div className="inner">
        <div className="navbar-item1">
          <h1>Navbar</h1>
          <button onClick={() => console.log(state)}>Show Cart</button>
          <button
            onClick={() =>
              dispatch(cartActions.addProduct({ name: "john", age: 25 }))
            }
          >
            Test
          </button>
          <Link to="/products">Products</Link>
          <Link to="/advanced-cart">Advanced cart</Link>
        </div>
        <div className="navbar-item2">
          <h2> Cart item numbers: {state.cart.totalQuantity}</h2>
          <h2> Total price: ${state.cart.totalPrice}</h2>
        </div>
      </div>
    </NavbarStyled>
  );
};

const NavbarStyled = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  color: white;
  padding: 0.5rem 0rem;
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  a {
    color: white;
    text-decoration: none;
  }
`;

export default Navbar;
