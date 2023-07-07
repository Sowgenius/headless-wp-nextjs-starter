/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/  
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    inStock: false,
    leadTime: "3–4 weeks",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35.00",
    color: "White",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
];

export default function Example() {
  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <h2 id="cart-heading" className="sr-only">
        Items in your shopping cart
      </h2>

      <ul
        role="list"
        className="divide-y divide-gray-200 border-t border-b border-gray-200"
      >
        {products.map((product, productIdx) => (
          <li key={product.id} className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
              <Image
                width="300"
                height="300"
                altText={productImg?.alt ?? ""}
                sourceUrl={!isEmpty(productImg?.src) ? productImg?.src : ""} // use normal <img> attributes as props
                className="h-24 w-24 rounded-md object-cover object-center sm:h-48
              sm:w-48"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-sm">
                      <Link href={item?.data?.url}>
                        <a className="font-medium text-gray-700 hover:text-gray-800">
                          {item?.data?.name}
                        </a>
                      </Link>
                    </h3>
                  </div>
                  <div className="mt-1 flex text-sm">
                    {item?.data?.description ? (
                      <p className="text-gray-500">{item?.data?.description}</p>
                    ) : (
                      ""
                    )}
                    {product.size ? (
                      <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                        {product.size}
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {item?.currency}
                    {item?.line_subtotal}
                  </p>
                </div>

                <div className="mt-4 sm:mt-0 sm:pr-9">
                  <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                    Quantity, {product.name}
                  </label>
                  <select
                    id={`quantity-${productIdx}`}
                    name={`quantity-${productIdx}`}
                    className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                  </select>

                  <div className="absolute top-0 right-0">
                    <button
                      type="button"
                      className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                      onClick={(event) =>
                        handleRemoveProductClick(event, item?.key)
                      }
                    >
                      <span className="sr-only">Remove</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                {product.inStock ? (
                  <CheckIcon
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ClockIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-300"
                    aria-hidden="true"
                  />
                )}

                <span>
                  {product.inStock
                    ? "In stock"
                    : `Ships in ${product.leadTime}`}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
