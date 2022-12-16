import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productsItem: [],
    cartItems: [],
    totalPrice: 0,
    grandTotalPrice: 0,
    totalQuantity: 0,
    vat: 7,
    mockData: "",
  },
  reducers: {
    getProduct(state, action) {
      const products = action.payload;
      state.productsItem = products;
    },
    addProduct(state, action) {
      const product = action.payload;
      const isShopExisted = state.cartItems.find(
        (shop) => shop.shop_id === product.shop_id
      );

      if (!isShopExisted) {
        const newShop = {
          shop_title: product.shop_title,
          shop_id: product.shop_id,
          products: [product],
          selected: false,
        };
        state.cartItems.push(newShop);
      } else {
        const isProductExisted = isShopExisted.products.find(
          (i) => i.id === product.id
        );
        if (!isProductExisted) {
          isShopExisted.products.push(product);
        } else {
          console.log("product existed");
        }
      }
    },
    deleteProduct(state, action) {
      const product = action.payload;
      const matchedShop = state.cartItems.find(
        (shop) => shop.shop_id === product.shop_id
      );
      const filteredProducts = matchedShop.products.filter(
        (i) => i.id !== product.id
      );
      state.cartItems = state.cartItems.map((shop) => {
        return {
          ...shop,
          products:
            shop.shop_id === product.shop_id ? filteredProducts : shop.products,
        };
      });
    },
    deletedSelectedProduct(state) {
      state.cartItems = state.cartItems.map((shop) => {
        return {
          ...shop,
          products: shop.products.filter(
            (product) => product.selected === false
          ),
        };
      });
    },
    handleQuantity(state, action) {
      const type = action.payload.type;
      let product = action.payload.product;

      const matchedShop = state.cartItems.find(
        (shop) => shop.shop_id === product.shop_id
      );
      if (matchedShop) {
        let matchedProduct = matchedShop.products.find(
          (i) => i.id === product.id
        );
        if (type === "inc") {
          matchedProduct.quantity += 1;
        }
        if (type === "dec") {
          if (matchedProduct.quantity > 1) {
            matchedProduct.quantity -= 1;
          }
        }
      }
    },
    selectProduct(state, action) {
      const checked = action.payload.checked;
      const product = action.payload.product;
      const matchedShop = state.cartItems.find(
        (shop) => shop.shop_id === product.shop_id
      );
      const matchedProduct = matchedShop.products.find(
        (i) => i.id === product.id
      );
      matchedProduct.selected = checked ? true : false;
    },
    selectAllShopProduct(state, action) {
      const checked = action.payload.checked;
      const shop = action.payload.shop;

      state.cartItems = state.cartItems.map((i) => {
        if (i.shop_id === shop.shop_id) {
          return {
            ...i,
            selected: checked ? true : false,
            products: i.products.map((x) => {
              return {
                ...x,
                selected: checked ? true : false,
              };
            }),
          };
        }
        return i;
      });
    },
    selectAllProduct(state, action) {
      const checked = action.payload;

      state.cartItems = state.cartItems.map((shop) => {
        return {
          ...shop,
          selected: checked ? true : false,
          products: shop.products.map((product) => {
            return {
              ...product,
              selected: checked ? true : false,
            };
          }),
        };
      });
    },
    calculate(state) {
      const newArray = [];
      const getAllProducts = state.cartItems.map((shop) => {
        return shop.products.map((product) => {
          return { ...product };
        });
      });
      const allProducts = newArray.concat(...getAllProducts);

      const getTotalQuantity = allProducts.reduce((acc, item) => {
        return (acc += item.quantity);
      }, 0);
      const getTotalPrice = allProducts.reduce((acc, item) => {
        return (acc += item.quantity * item.price);
      }, 0);

      state.totalQuantity = getTotalQuantity;
      state.totalPrice = getTotalPrice;
    },
    refreshCart(state) {
      state.cartItems = state.cartItems.filter(
        (shop) => shop.products.length > 0
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
