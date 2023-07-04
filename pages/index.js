//import Header from '../src/components/layout/header';
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/footer";
import axios from "axios";
import {
  HEADER_FOOTER_ENDPOINT,
  GET_PRODUCTS_ENDPOINT,
} from "../src/utils/constants/endpoints";
import Products from "../src/components/products";
import { getProductsData } from "../src/utils/products";
//import Products from "../src/components/products/index";

export default function Home({ headerFooter, products }) {
  const { header, footer } = headerFooter || {};
  console.warn("headerfooter", headerFooter);

  return (
    <div>
      <Header header={header} />
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
          <Products products={products} />
        </h1>
      </main>
      <Footer footer={footer} />
    </div>
  );
}

export async function getStaticProps() {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  //const { data: products } = await getProductsData();

  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      //products: products ?? {},
    },
    revalidate: 10,
  };
}