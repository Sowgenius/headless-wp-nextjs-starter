const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
});

/**
 * Get Payments.
 *
 * Endpoint /api/get-payments
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export default async function handler(req, res) {
  const responseData = {
    success: false,
    payments: [],
  };

  try {
    const { data } = await api.get("payment_gateways");

    responseData.success = true;
    responseData.payments = data;

    res.json(responseData);
  } catch (error) {
    responseData.error = error.message;
    res.status(500).json(responseData);
    console.log("Response Status:", error.response.status);
    console.log("Response Headers:", error.response.headers);
    console.log("Response Data:", error.response.data);
  }
}
