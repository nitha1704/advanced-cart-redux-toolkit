import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/advanced-cart-slice";

const AdvancedCart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const [checkboxAll, setCheckboxAll] = useState(false);

  const handleQuantity = (type, product) => {
    dispatch(cartActions.handleQuantity({ type, product }));
    dispatch(cartActions.calculate());
  };

  const handleProductDelete = (product) => {
    dispatch(cartActions.deleteProduct(product));
    dispatch(cartActions.calculate());
    dispatch(cartActions.refreshCart());
  };

  const handleSelectedProductDelete = () => {
    dispatch(cartActions.deletedSelectedProduct());
    dispatch(cartActions.calculate());
    dispatch(cartActions.refreshCart());
  };

  const handleCheckAllProduct = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setCheckboxAll(true);
    } else {
      setCheckboxAll(false);
    }
    dispatch(cartActions.selectAllProduct(checked));
  };

  const handleShopDelete = (e, shop) => {
    dispatch(
      cartActions.selectAllShopProduct({ checked: e.target.checked, shop })
    );
  };

  const handleSelect = (e, product) => {
    dispatch(cartActions.selectProduct({ checked: e.target.checked, product }));
  };

  const RenderCart = () => {
    if (state.cart.cartItems.length > 0) {
      return (
        <div>
          <div>
            <input
              type="checkbox"
              className="checkbox-all"
              checked={checkboxAll}
              onChange={(e) => handleCheckAllProduct(e)}
            />
            <span>Checkbox All</span>
          </div>
          {state.cart.cartItems.map((shop) => {
            return (
              <div className="shop" key={shop.shop_id}>
                <div className="shop-title">
                  <h1>
                    Shop name: {shop.shop_title}: {shop.shop_id}
                  </h1>
                </div>
                <div className="products">
                  <table border="1">
                    <thead>
                      <tr>
                        <th className="th-all-checkbox">
                          <input
                            type="checkbox"
                            onChange={(e) => handleShopDelete(e, shop)}
                            checked={shop.selected}
                          />
                        </th>
                        <th className="th-image">Image</th>
                        <th className="th-description">Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Menu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shop.products.length > 0 &&
                        shop.products.map((product) => {
                          return (
                            <tr key={product.id}>
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={(e) => handleSelect(e, product)}
                                  checked={product.selected}
                                />
                              </td>
                              <td className="td-image">
                                <img src={product.image} alt={product.title} />
                              </td>
                              <td className="td-description">
                                {product.description}
                              </td>
                              <td className="td-price">${product.price}</td>
                              <td className="td-quantity">
                                <div className="wrapper">
                                  <button
                                    onClick={() =>
                                      handleQuantity("dec", product)
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="quantity">
                                    {product.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleQuantity("inc", product)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="td-menu">
                                <button
                                  onClick={() => handleProductDelete(product)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return <h1>No products</h1>;
  };

  return (
    <AdvancedCartStyled>
      <h1>Advanced Cart</h1>
      <div className="inner">
        <RenderCart />
        <div className="footer">
          <button>Check all product</button>
          <button onClick={() => handleSelectedProductDelete()}>
            Delete selected product
          </button>
        </div>
      </div>
    </AdvancedCartStyled>
  );
};

const AdvancedCartStyled = styled.div`
  input[type="checkbox"] {
    cursor: pointer;
  }
  .checkbox-all {
    width: 2rem;
    height: 2rem;
  }
  .shop {
    border: 0.1rem solid;
    margin-bottom: 2rem;
  }
  table {
    width: 100%;
    text-align: center;
    thead {
    }
    tbody {
      .td-image {
        img {
          width: 10rem;
          height: 10rem;
        }
      }
    }
  }
`;

export default AdvancedCart;
