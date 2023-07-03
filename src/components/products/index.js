import { isEmpty, isArray } from "lodash";
import Product from "./product";

const Products = ({ products }) => {
  if (isEmpty(products) || !isArray(products)) {
    return null;
  }

  console.warn("products", products);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Boutique</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.length ? (
            products.map((product) => {
              return <Product key={product?.id} product={product} />;
            })
          ) : (
            <div>Loading ...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
