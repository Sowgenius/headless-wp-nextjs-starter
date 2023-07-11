import axios from "axios";
import Layout from "../src/components/layout";
import {
  HEADER_FOOTER_ENDPOINT,
  WOO_COUNTRIES_ENDPOINT,
} from "../src/utils/constants/endpoints";
import CheckoutForm from "../src/components/checkout/checkout-form";

const Checkout = ({ headerFooter, countries }) => {
  return (
    <Layout headerFooter={headerFooter || {}}>
      <h1>Commande</h1>
      <CheckoutForm countriesData={countries} />
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const { data: countries } = await axios.get(WOO_COUNTRIES_ENDPOINT);

  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      countries: countries ?? {},
    },
    revalidate: 5,
  };
}
export default Checkout;
