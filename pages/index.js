import axios from "axios";
import { HEADER_FOOTER_ENDPOINT } from "../src/utils/constants/endpoints";

/*
 * Internal Dependecies
 */
import Products from "../src/components/products";
import { getProductsData } from "../src/utils/products";
import Layout from "../src/components/layout";

export default function Home({ headerFooter, products }) {
  return (
    <Layout headerFooter={headerFooter}>
      <main>
        <Products products={products} />
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const { data: products } = await getProductsData();

  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      products: products ?? {},
    },
    revalidate: 10,
  };
}
