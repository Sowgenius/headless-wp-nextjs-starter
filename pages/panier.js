import axios from "axios";
import Layout from "../src/components/layout";
import { HEADER_FOOTER_ENDPOINT } from "../src/utils/constants/endpoints";
//import CartPreview from "../src/components/cart/cart-preview";
import CartItemsContainer from "../src/components/cart/cart-items-container";

const Panier = ({ headerFooter }) => {
  return (
    <Layout headerFooter={headerFooter || {}}>
      <CartItemsContainer />
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);

  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
    },
    revalidate: 10,
  };
}
export default Panier;
