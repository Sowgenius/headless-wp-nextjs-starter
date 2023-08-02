import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
});

/**
 * Get Shipping Zones, Locations, and Methods.
 *
 * @return {Promise<any>}
 */
export const getShippingZonesAndMethods = async () => {
  try {
    // Fetch shipping zones
    const zonesResponse = await api.get("shipping/zones");
    const zonesData = zonesResponse?.data ?? [];

    // Fetch shipping locations for each zone
    const locationsPromises = zonesData.map(async (zone) => {
      try {
        const locationsResponse = await api.get(
          `shipping/zones/${zone.id}/locations`
        );
        const locationsData = locationsResponse?.data ?? [];
        return { zone, locations: locationsData };
      } catch (error) {
        console.error(
          `Error fetching shipping locations for zone ID ${zone.id}:`,
          error
        );
        return { zone, locations: [] }; // Return an empty array if there's an error fetching locations
      }
    });

    // Wait for all shipping locations to be fetched
    const shippingZonesAndLocations = await Promise.all(locationsPromises);

    // Fetch shipping methods for each zone
    const shippingMethodsPromises = shippingZonesAndLocations.map(
      async (item) => {
        const { zone, locations } = item;
        try {
          const methodsResponse = await api.get(
            `shipping/zones/${zone.id}/methods`
          );
          const methodsData = methodsResponse?.data ?? [];
          return { zone, locations, methods: methodsData };
        } catch (error) {
          console.error(
            `Error fetching shipping methods for zone ID ${zone.id}:`,
            error
          );
          return { zone, locations, methods: [] }; // Return an empty array if there's an error fetching methods
        }
      }
    );

    // Wait for all shipping methods to be fetched
    const shippingZonesAndMethods = await Promise.all(shippingMethodsPromises);

    return shippingZonesAndMethods;
  } catch (error) {
    console.error("Error fetching shipping zones:", error);
    return [];
  }
};
