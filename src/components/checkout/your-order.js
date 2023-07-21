import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import CheckoutCartItem from "./checkout-cart-item";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const YourOrder = ({ cart }) => {
  console.log("panier checkout", cart);
  return (
    <>
      {cart ? (
        <>
          <section
            aria-labelledby="summary-heading"
            className="bg-gray-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
          >
            <div className="mx-auto max-w-lg lg:max-w-none">
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Résumé de Commande
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
              >
                {cart?.cartItems?.length &&
                  cart.cartItems.map((item, index) => (
                    <CheckoutCartItem
                      key={item?.productId ?? index}
                      item={item}
                    />
                  ))}
              </ul>

              <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
                {/* <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd>{cart?.cartItems?.[0]?.line_subtotal ?? ""}</dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd>$15.00</dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Taxes</dt>
                  <dd>$26.80</dd>
                </div> */}

                <div className="flex items-center justify-between ">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">
                    {cart?.cartItems?.[0]?.currency ?? ""}
                    {cart?.totalPrice ?? ""}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default YourOrder;
