const fetchPaymentMethods = async () => {
  try {
    const response = await fetch("/api/get-payments");
    if (!response.ok) {
      throw new Error("Failed to fetch payment methods");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return [];
  }
};

export default fetchPaymentMethods;
