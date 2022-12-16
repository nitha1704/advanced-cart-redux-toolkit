import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/advanced-cart-slice";

const Products = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const getProducts = async () => {
    const products = await fetch(
      "https://product8-api.netlify.app/product8.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const refactorData = data.map((i, index) => {
          return { ...i, quantity: 1, selected: false };
        });
        return refactorData;
      });

    dispatch(cartActions.getProduct(products));
  };

  const addProduct = (product) => {
    dispatch(cartActions.addProduct(product));
    dispatch(cartActions.calculate());
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log("updated");
  }, [state.cart.cartItems]);

  return (
    <ProductsSection>
      <div className="wrapper">
        <h1>Products</h1>

        {state.cart.productsItem.length > 0 ? (
          <div className="products-container">
            {state.cart.productsItem.map((item) => {
              return (
                <div className="product" key={item.id}>
                  <h2>
                    {item.shop_number}:&nbsp;&nbsp;
                    {item.shop_title}
                  </h2>
                  <div className="image">
                    <img src={item.image} />
                  </div>
                  <h3>{item.title}</h3>
                  <h3>${item.price}</h3>
                  <button onClick={() => addProduct(item)}>Add to cart</button>
                </div>
              );
            })}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </ProductsSection>
  );
};

const ProductsSection = styled.section`
  .wrapper {
    margin: 0 auto;
    width: 95%;
  }
  .products-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;
    text-align: center;
  }
  .product {
    border: 0.1rem solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    h2 {
      flex-grow: 1;
    }
    img {
      width: 10rem;
      height: 10rem;
    }
    button {
      cursor: pointer;
    }
  }
`;

export default Products;
