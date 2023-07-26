import axios from "axios";

const calculateTotalPrice = async (
  shippingMethod,
  cart,
  billingInfo,
  setTotalPrice
) => {
  try {
    // Fetch shipping costs from the WooCommerce API based on the selected shipping method
    const shippingResponse = await axios.get(
      `/wc/v3/shipping/zones/${shippingMethod.zone_id}/methods/${shippingMethod.id}`
    );

    const shippingCost = parseFloat(
      shippingResponse?.data?.settings?.cost || 0
    );

    // Calculate the cart total
    const cartTotal = cart.reduce((total, product) => {
      // You may need to fetch the product price from the WooCommerce API instead of using the frontend cart data
      const productPrice = product.price;
      return total + productPrice * product.quantity;
    }, 0);

    // Calculate the total price (cart total + shipping cost)
    const total = cartTotal + shippingCost;
    setTotalPrice(total);
  } catch (error) {
    console.error("Error calculating total price:", error);
    // Handle the error or set an appropriate error state
  }
};

export default calculateTotalPrice;
