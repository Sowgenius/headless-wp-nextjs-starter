import { getSession, storeSession } from "./session";
import { getApiCartConfig } from "./api";
import axios from "axios";
import { CART_ENDPOINT } from "../constants/endpoints";
import { isEmpty, isArray } from "lodash";

export const addToCart = async (
  productId,
  qty = 1,
  setCart,
  setIsAddedToCart,
  setLoading
) => {
  const storedSession = getSession();
  const addOrViewCartConfig = getApiCartConfig();

  setLoading(true);

  try {
    const response = await axios.post(
      CART_ENDPOINT,
      {
        product_id: productId,
        quantity: qty,
      },
      addOrViewCartConfig
    );

    if (isEmpty(storedSession)) {
      storeSession(response?.headers?.["x-wc-session"]);
    }

    setIsAddedToCart(true);
    setLoading(false);
    viewCart(setCart);
  } catch (err) {
    console.log("err", err);
  }
};

export const viewCart = async (setCart, setProcessing = () => {}) => {
  const addOrViewCartConfig = getApiCartConfig();

  try {
    const response = await axios.get(CART_ENDPOINT, addOrViewCartConfig);
    const formattedCartData = getFormattedCartData(response?.data ?? []);
    setCart(formattedCartData);
    setProcessing(false);
  } catch (err) {
    console.log("err", err);
    setProcessing(false);
  }
};

export const updateCart = async (
  cartKey,
  qty = 1,
  setCart,
  setUpdatingProduct
) => {
  const addOrViewCartConfig = getApiCartConfig();

  setUpdatingProduct(true);

  try {
    await axios.put(
      `${CART_ENDPOINT}${cartKey}`,
      {
        quantity: qty,
      },
      addOrViewCartConfig
    );

    viewCart(setCart, setUpdatingProduct);
  } catch (err) {
    console.log("err", err);
    setUpdatingProduct(false);
  }
};

export const deleteCartItem = async (cartKey, setCart, setRemovingProduct) => {
  const addOrViewCartConfig = getApiCartConfig();

  setRemovingProduct(true);

  try {
    await axios.delete(`${CART_ENDPOINT}${cartKey}`, addOrViewCartConfig);
    viewCart(setCart, setRemovingProduct);
  } catch (err) {
    console.log("err", err);
    setRemovingProduct(false);
  }
};

export const clearCart = async (setCart, setClearCartProcessing) => {
  setClearCartProcessing(true);

  const addOrViewCartConfig = getApiCartConfig();

  try {
    await axios.delete(CART_ENDPOINT, addOrViewCartConfig);
    viewCart(setCart, setClearCartProcessing);
  } catch (err) {
    console.log("err", err);
    setClearCartProcessing(false);
  }
};

const getFormattedCartData = (cartData) => {
  if (!cartData.length) {
    return null;
  }

  const cartTotal = calculateCartQtyAndPrice(cartData || []);

  return {
    cartItems: cartData || [],
    ...cartTotal,
  };
};

const calculateCartQtyAndPrice = (cartItems) => {
  const qtyAndPrice = {
    totalQty: 0,
    totalPrice: 0,
  };

  if (!isArray(cartItems) || !cartItems?.length) {
    return qtyAndPrice;
  }

  cartItems.forEach((item, index) => {
    qtyAndPrice.totalQty += item?.quantity ?? 0;
    qtyAndPrice.totalPrice += item?.line_total ?? 0;
  });

  return qtyAndPrice;
};
