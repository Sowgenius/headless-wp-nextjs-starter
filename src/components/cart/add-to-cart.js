import { useContext, useState, forwardRef } from "react";
import { AppContext } from "../context";
import cx from "classnames";
import Link from "next/link";
import { addToCart } from "../../utils/cart";

const AddToCart = ({ product }) => {
  const [cart, setCart] = useContext(AppContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const MyLink = forwardRef((props, ref) => {
    let { href, children, ...rest } = props;
    return (
      <Link legacyBehavior href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  });

  const addToCartBtnClasses = cx(
    "bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900",
    {
      "bg-white hover:bg-gray-200": !loading,
      "bg-gray-200": loading,
    }
  );

  if (!product) {
    return null;
  }

  /*const addToCart = () => {
    setLoading(true);

    // Add the product to the cart
    const updatedCart = { ...cart };
    const existingProduct = updatedCart[product.id];

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart[product.id] = {
        ...product,
        quantity: 1,
      };
    }

    setCart(updatedCart);
    setIsAddedToCart(true);
    setLoading(false);
  };*/

  return (
    <div className="mt-6">
      <div
        onClick={() =>
          addToCart(product?.id ?? 0, 1, setCart, setIsAddedToCart, setLoading)
        }
        disabled={loading}
        className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
      >
        {loading ? "Ajout..." : "Ajouter au Panier"}
        <span className="sr-only">, {product.name}</span>
      </div>
      {isAddedToCart && !loading ? (
        <Link legacyBehavior href="/panier">
          <a className="relative flex items-center justify-center my-2 rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">
            Voir Panier
          </a>
        </Link>
      ) : null}
    </div>
  );
};

export default AddToCart;
