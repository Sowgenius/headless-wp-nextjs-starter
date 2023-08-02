// hooks/useShipping.js
import { useEffect, useState } from "react";
import { getShippingZonesAndMethods } from "../src/utils/fetch-shipping-methods";

const useShipping = () => {
  const [shippingZonesAndMethods, setShippingZonesAndMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShippingData = async () => {
      try {
        const data = await getShippingZonesAndMethods();
        setShippingZonesAndMethods(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchShippingData();
  }, []);

  return { shippingZonesAndMethods, loading, error };
};

export default useShipping;
