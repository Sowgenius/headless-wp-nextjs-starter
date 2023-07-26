import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
});

/**
 * Get Shipping Zones and Methods.
 *
 * @return {Promise<any>}
 */
export const getShippingZonesAndMethods = async () => {
  try {
    const zonesResponse = await api.get("shipping/zones");
    const zonesData = zonesResponse?.data ?? [];

    // Fetch shipping methods for each zone
    const shippingMethodsPromises = zonesData.map(async (zone) => {
      try {
        const methodsResponse = await api.get(
          `shipping/zones/${zone.id}/methods`
        );
        const methodsData = methodsResponse?.data ?? [];
        return { zone, methods: methodsData };
      } catch (error) {
        console.error(
          `Error fetching shipping methods for zone ID ${zone.id}:`,
          error
        );
        return { zone, methods: [] }; // Return an empty array if there's an error fetching methods
      }
    });

    // Wait for all shipping methods to be fetched
    const shippingZonesAndMethods = await Promise.all(shippingMethodsPromises);

    return shippingZonesAndMethods;
  } catch (error) {
    console.error("Error fetching shipping zones:", error);
    return [];
  }
};
