import React, { useContext, useState } from "react";
import { AppContext } from "../context";
import CartItem from "./cart-item";

import Link from "next/link";
import { clearCart } from "../../utils/cart";

const CartItemsContainer = () => {
  const [cart, setCart] = useContext(AppContext);
  const { cartItems, totalPrice, totalQty } = cart || {};
  const [isClearCartProcessing, setClearCartProcessing] = useState(false);

  // Clear the entire cart.
  const handleClearCart = async (event) => {
    event.stopPropagation();

    if (isClearCartProcessing) {
      return;
    }

    await clearCart(setCart, setClearCartProcessing);
  };

  return (
    <div className="content-wrap-cart">
      {cart ? (
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-5">
            Panier
          </h1>
          <div className="woo-next-cart-table-row grid lg:grid-cols-3 gap-4">
            {/*Cart Items*/}
            <div className="woo-next-cart-table lg:col-span-2 mb-md-0 mb-5">
              {cartItems.length &&
                cartItems.map((item) => (
                  <CartItem
                    key={item.product_id}
                    item={item}
                    products={cartItems}
                    setCart={setCart}
                  />
                ))}
            </div>

            {/*Cart Total*/}
            <div className="woo-next-cart-total-container  lg:col-span-1 p-5 pt-0">
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900 my-5"
                >
                  Résumé Commande
                </h2>
                <div className="flex grid grid-cols-3 bg-gray-100 mb-4">
                  <p className="col-span-2 p-2 mb-0">Total({totalQty})</p>
                  <p className="col-span-1 p-2 mb-0">
                    {cartItems?.[0]?.currency ?? ""}
                    {totalPrice}
                  </p>
                </div>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Quantité</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ({totalQty})
                    </dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900"></dt>
                    <dd className="text-base font-medium text-gray-900"></dd>
                  </div>
                </dl>
                <div className="flex justify-between">
                  {/*Clear entire cart*/}
                  <div className="clear-cart">
                    <button
                      className="text-gray-900 bg-transparent mb-2 hover:text-white  hover:bg-red-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                      onClick={(event) => handleClearCart(event)}
                      disabled={isClearCartProcessing}
                    >
                      <span className="woo-next-cart">
                        {!isClearCartProcessing
                          ? "Vider Panier"
                          : "Suppression..."}
                      </span>
                    </button>
                  </div>

                  {/*Checkout*/}
                  <Link href="/Checkout">
                    <button className="text-white duration-500  focus:ring-4 focus:text-white font-medium rounded-lg text-sm  text-center mb-2">
                      <span className=" rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                        Commander
                      </span>
                      <i className="fas fa-long-arrow-alt-right" />
                    </button>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-14">
          <h2>Panier Vide </h2>
          <Link href="/">
            <button className="text-white duration-500 bg-brand-orange hover:bg-brand-royal-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">
              <span className="woo-next-cart-checkout-txt">
                Ajouter Produit
              </span>
              <i className="fas fa-long-arrow-alt-right" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItemsContainer;
