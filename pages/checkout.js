import axios from "axios";
import Layout from "../src/components/layout";
import {
  HEADER_FOOTER_ENDPOINT,
  WOO_COUNTRIES_ENDPOINT,
} from "../src/utils/constants/endpoints";
import CheckoutForm from "../src/components/checkout/checkout-form";
import { getPaymentMethods } from "../src/utils/payment-methods";

const Checkout = ({ headerFooter, countries, paymentMethods }) => {
  return (
    <Layout headerFooter={headerFooter || {}}>
      <h1>Commande</h1>
      <CheckoutForm countriesData={countries} paymentMethods={paymentMethods} />
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const { data: countries } = await axios.get(WOO_COUNTRIES_ENDPOINT);
  const paymentMethods = await getPaymentMethods();
  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      countries: countries ?? {},
      paymentMethods: paymentMethods ?? {},
    },
    revalidate: 3500,
  };
}
export default Checkout;
