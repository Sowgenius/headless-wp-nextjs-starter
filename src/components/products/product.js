import { sanitize } from "../../utils/miscellaneous";
import { isEmpty } from "lodash";
import AddToCart from "../cart/add-to-cart";
import Image from "../image";

const Product = ({ product }) => {
  if (isEmpty(product)) {
    return null;
  }

  const img = product?.images[0] ?? {};
  const productType = product?.type ?? "";
  return (
    <div>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <Image
            sourceUrl={img?.src ?? ""}
            altText={img?.alt}
            width={257}
            height={288}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">
            {product?.name ?? ""}
          </h3>
          <p className="mt-1 text-sm text-gray-500">product.color</p>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p
            className="relative text-lg font-semibold text-white"
            dangerouslySetInnerHTML={{ __html: sanitize(product.price_html) }}
          ></p>
        </div>
      </div>
      {"simple" === productType ? <AddToCart product={product} /> : null}
    </div>
  );
};

export default Product;
/*

<div className="mt-6">
        <MyLink
          href={product.permalink}
          className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
        >
          Ajouter au panier
          <span className="sr-only">, {product.name}</span>
        </MyLink>
      </div>

*/
