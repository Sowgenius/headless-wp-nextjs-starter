/**
 * Handle Billing Different Than Shipping.
 *
 * @param input
 * @param setInput
 * @param target
 */
export const handleBillingDifferentThanShipping = (input, setInput, target) => {
  const newState = {
    ...input,
    [target.name]: !input.billingDifferentThanShipping,
  };
  setInput(newState);
};

/**
 * Handle Create Account.
 *
 * @param input
 * @param setInput
 * @param target
 */
export const handleCreateAccount = (input, setInput, target) => {
  const newState = { ...input, [target.name]: !input.createAccount };
  setInput(newState);
};

/**
 * Set states for country
 * @param {Object} target Target
 * @param {Function} setTheStates
 * @param {Function} setIsFetchingStates
 *
 * @returns {Promise<void>} Promise
 */

import axios from "axios";
import { WOO_PM_ENDPOINT, WOO_STATES_ENDPOINT } from "../constants/endpoints";

export const setStatesForCountry = async (
  target,
  setTheStates,
  setIsFetchingStates
) => {
  if ("country" !== target.name) {
    return null;
  }
  setIsFetchingStates(true);
  const countryCode =
    target[target.selectedIndex].getAttribute("data-countrycode");

  const states = await getStates(countryCode);
  setTheStates(states);
  setIsFetchingStates(false);
};

/**
 * Get the states
 *
 * @param {string} countryCode countryCode
 *
 * @return {Promise<void>}
 */

export const getStates = async (countryCode = "") => {
  if (!countryCode) {
    return [];
  }
  const { data } = await axios.get(WOO_STATES_ENDPOINT, {
    params: { countryCode },
  });
  return data?.states ?? [];
};

// utils/fetchPaymentMethods.js
// Create an Axios instance with the WooCommerce consumer key and secret as headers
const axiosWithAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
    ).toString("base64")}`,
  },
});

export const fetchPaymentMethods = async () => {
  try {
    const { data } = await axiosWithAuth.get(WOO_PM_ENDPOINT);
    return data ?? [];
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return [];
  }
};
