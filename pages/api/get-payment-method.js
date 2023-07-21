import axios from "axios";
import { WOO_PM_ENDPOINT } from "../utils/constants/endpoints";

export async function getPaymentMethods() {
  try {
    const { data } = await axios.get(WOO_PM_ENDPOINT);
    return data ?? [];
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return [];
  }
}
