const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const https = require("https");

// Disable SSL certificate verification for development purpose
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  axiosConfig: {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  },
});

/**
 * Get Products.
 *
 * Endpoint /api/get-products or '/api/get-products?perPage=2'
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const getProductsData = async (perPage) => {
  return await api.get("products", {
    per_page: perPage || 50,
  });
};
