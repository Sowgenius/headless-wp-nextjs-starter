import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
});

/**
 * Get Payment Methods.
 *
 * @return {Promise<any>}
 */
export const getPaymentMethods = async () => {
  try {
    const response = await api.get("payment_gateways");
    return response?.data ?? [];
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return [];
  }
};

/**
 * Get Shipping Methods.
 *
 * @return {Promise<any>}
 */
export const getShippingMethods = async () => {
  try {
    const response = await api.get("shipping_methods");
    return response?.data ?? [];
  } catch (error) {
    console.error("Error fetching shipping methods:", error);
    return [];
  }
};

// Add other utility functions if needed for payment processing, etc.
