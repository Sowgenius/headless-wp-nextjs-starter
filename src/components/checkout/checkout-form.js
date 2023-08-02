//import { Disclosure, Popover, Transition } from "@headlessui/react";
//import { ChevronUpIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Fragment, useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import Address from "./user-adress";
import {
  handleBillingDifferentThanShipping,
  handleCreateAccount,
  setStatesForCountry,
} from "../../utils/checkout";
import CheckboxField from "./form-elements/checkbox-field";
import YourOrder from "./your-order";
import PaymentModes from "./payment-modes";
import ShippingOptions from "./shipping-options";
import { getShippingZonesAndMethods } from "../../utils/fetch-shipping-methods";


//const defaultCustomerInfo = {
//    firstName: 'John',
//    lastName: 'Doe',
//    email: 'envkt@example.com',
//    phone: '+221 (77) 555-12-12',
//    address: '17 Rue Kolda',
//    address2: 'Point E',
//    state:'Dakar',
//    city: 'Dakar',
//    country: 'SN',
//    zipCode: '10700',
//   company:'The Company',
//    error: null,

//}
const defaultCustomerInfo = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  email: "",
  phone: "",
  state: "",
  city: "",
  country: "",
  postCode: "",
  company: "",
  error: null,
};

const CheckoutForm = ({ countriesData, paymentMethods }) => {
  console.log("paymentMethods", { paymentMethods });

  const { billingCountries, shippingCountries } = countriesData || {};
  console.log("NewData", [billingCountries, shippingCountries]);
  const initialState = {
    billing: {
      ...defaultCustomerInfo,
    },
    shipping: {
      ...defaultCustomerInfo,
    },
    createAccount: false,
    orderNotes: "",
    billingDifferentThanShipping: false,
    paymentMethod: "cod",
    shipping_total: "",
    shipping_lines: [],
    coupon_lines: [],
    shippingMethod: "",
    shippingState: "",
  };
  const [cart, setCart] = useContext(AppContext);
  const [input, setInput] = useState(initialState);
  const [requestError, setRequestError] = useState(null);
  const [theShippingStates, setTheShippingStates] = useState([]);
  const [theBillingStates, setTheBillingStates] = useState([]);
  const [isFetchingShippingStates, setIsFetchingShippingStates] =
    useState(false);
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [createOrderDate, setCreateOrderDate] = useState({});

  const [shippingZonesAndMethods, setShippingZonesAndMethods] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [shippingTotal, setShippingTotal] = useState("");
  const [shippingLines, setShippingLines] = useState([]);

  // Fetch shipping zones and methods on component mount
  useEffect(() => {
    fetchShippingZonesAndMethods();
  }, []);

  const fetchShippingZonesAndMethods = async () => {
    // Get the shipping zones and methods from the API
    const shippingZonesAndMethodsData = await getShippingZonesAndMethods();
    console.log("shippingZonesAndMethodsData", shippingZonesAndMethodsData);

    // Set the shipping zones and methods in the state
    setShippingZonesAndMethods(shippingZonesAndMethodsData);
  };

  const handleFormSubmit = () => {};

  const handleOnChange = async (
    event,
    isShipping = false,
    isBillingOrShipping = false
  ) => {
    const { target } = event || {};
    console.log("target", target);
    console.log("event", event);
    if ("createAccount" === target.name) {
      handleCreateAccount(input, setInput, target);
    } else if ("billingDifferentThanShipping" === target.name) {
      handleBillingDifferentThanShipping(input, setInput, target);
    } else if (isBillingOrShipping) {
      if (isShipping) {
        //handle Shipping
        await handleShippingChange(target);
        const selectedShippingZone = shippingZonesAndMethods.find((item) =>
          item.locations.some((location) => location.code === target.value)
        );
        if (selectedShippingZone) {
          setShippingMethods(selectedShippingZone.methods);
        } else {
          setShippingMethods([]);
        }
      } else {
        //handle Billing
        await handleBillingChange(target);
      }
    } else {
      const newState = { ...input, [target.name]: target.value };
      setInput(newState);
    }

    console.log("input", input);

    // Extract the selected state code from the dropdown menu and set it in the state
    if (target.name === "state") {
      const selectedStateOption = target.options[target.selectedIndex];

      console.log("selectedStateOption", selectedStateOption);

      const selectedStateCode =
        selectedStateOption.getAttribute("data-statecode");
      console.log("selectedStateCode", selectedStateCode);
      setInput((prevInput) => ({
        ...prevInput,
        shippingState: selectedStateCode,
      }));
    }
  };

  const handleShippingChange = async (target) => {
    const newState = {
      ...input,
      shipping: { ...input?.shipping, [target.name]: target.value },
    };
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheShippingStates,
      setIsFetchingShippingStates
    );
  };

  const handleBillingChange = async (target) => {
    const newState = {
      ...input,
      billing: { ...input?.billing, [target.name]: target.value },
    };
    setInput(newState);
    //console.log("newState", newState);
    await setStatesForCountry(
      target,
      setTheBillingStates,
      setIsFetchingBillingStates
    );
  };

  const handleShippingMethodChange = (selectedShippingMethod) => {
    console.log("Selected Shipping Method:", selectedShippingMethod);

    const { method_id, method_title, total } = selectedShippingMethod;

    const shippingLine = {
      method_id: method_id,
      method_title: method_title,
      total: total ? total : 0, // Set the total to 0 if cost is empty
    };

    console.log("Shipping Line:", shippingLine);

    setInput((prevInput) => ({
      ...prevInput,
      shipping_lines: [shippingLine], // Set the selected shipping method to shipping_lines as an array
      shipping_total: total ? total : 0,
    }));
  };

  return (
    <div className="bg-white">
      {/* Background color split screen for large screens */}
      <div
        className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 hidden h-full w-1/2 bg-gray-50 lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Information de commande </h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-gray-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Votre Commande
            </h2>

            {/* <ul
              role="list"
              className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
            >
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex items-start space-x-4 py-6"
                >
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3>{product.name}</h3>
                    <p className="text-gray-500">{product.color}</p>
                    <p className="text-gray-500">{product.size}</p>
                  </div>
                  <p className="flex-none text-base font-medium">
                    {product.price}
                  </p>
                </li>
              ))}
            </ul> */}

            {/* <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd>$320.00</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd>$15.00</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Taxes</dt>
                <dd>$26.80</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">$361.80</dd>
              </div>
            </dl> */}
            <YourOrder cart={cart} />

            {/* <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
              <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                <div className="mx-auto max-w-lg">
                  <Popover.Button className="flex w-full items-center py-6 font-medium">
                    <span className="mr-auto text-base">Total</span>
                    <span className="mr-2 text-base">$361.80</span>
                    <ChevronUpIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div>
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                  >
                    <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                      <dl className="mx-auto max-w-lg space-y-6">
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Subtotal</dt>
                          <dd>$320.00</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Shipping</dt>
                          <dd>$15.00</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Taxes</dt>
                          <dd>$26.80</dd>
                        </div>
                      </dl>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </Popover> */}
          </div>

          <div className="mx-auto max-w-lg lg:max-w-none">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Methode de Paiement
            </h2>
            <PaymentModes
              input={input}
              handleOnChange={handleOnChange}
              paymentMethods={paymentMethods}
            />
          </div>

          <div className="mx-auto max-w-lg lg:max-w-none">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Methode de Livraison
            </h2>

            <ShippingOptions
              shippingZonesAndMethods={shippingZonesAndMethods}
              selectedStateCode={input.shippingState} // Pass the selected state code to ShippingOptions
              onShippingMethodChange={handleShippingMethodChange} // Pass the callback to handle shipping method change
            />
          </div>
        </section>

        <form
          onSubmit={handleFormSubmit}
          className="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <section aria-labelledby="contact-info-heading">
              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900"
              >
                Information de contact
              </h2>
            </section>

            <section aria-labelledby="shipping-heading" className="mt-10">
              <h2
                id="shipping-heading"
                className="text-lg font-medium text-gray-900"
              >
                Addresse de livraison
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                <Address
                  states={theShippingStates}
                  countries={shippingCountries}
                  input={input?.shipping}
                  handleOnChange={(event) => handleOnChange(event, true, true)}
                  isFetchingStates={isFetchingShippingStates}
                  isShipping
                />
              </div>
            </section>

            <section aria-labelledby="billing-heading" className="mt-10">
              <h2
                id="billing-heading"
                className="text-lg font-medium text-gray-900"
              >
                Information de facturation
              </h2>

              <div>
                <CheckboxField
                  name="billingDifferentThanShipping"
                  type="checkbox"
                  checked={input?.billingDifferentThanShipping}
                  handleOnChange={handleOnChange}
                  label="Cochez ici si les informations de facturations diffèrent"
                  containerClassNames="mt-6 flex items-center mb-6"
                />

                {input?.billingDifferentThanShipping ? (
                  <Address
                    states={theBillingStates}
                    countries={
                      billingCountries.length
                        ? billingCountries
                        : shippingCountries
                    }
                    input={input?.billing}
                    handleOnChange={(event) =>
                      handleOnChange(event, false, true)
                    }
                    isFetchingStates={isFetchingBillingStates}
                    isShipping={false}
                  />
                ) : null}
              </div>
            </section>
            <section aria-labelledby="payment-heading" className="mt-10">
              <h2
                id="payment-heading"
                className="text-lg font-medium text-gray-900"
              >
                Détails de paiement
              </h2>

              <div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-4">
                <div className="col-span-3 sm:col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-4">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
              <button
                disabled={isOrderProcessing}
                type="submit"
                className={cx(
                  "w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto", {'opacity-50':  isOrderProcessing }
                )}
              >
                Continue
              </button>
              <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                Vous ne serez facturez qu'à l'étape suivante.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
