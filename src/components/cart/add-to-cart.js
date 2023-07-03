import { isEmpty } from "lodash";
import { addToCart } from "../../utils/cart";
import axios from "axios";
import ADD_TO_CART_ENDPOINT from "../../utils/constants/endpoints";

const AddToCart = ({ product }) => {
  if (isEmpty(product)) {
    return null;
  }

  const addToCart = (productId, qty = 1) => {
    axios
      .post(
        ADD_TO_CART_ENDPOINT,
        {
          product_id: productId,
          quantity: qty,
        },
        {
          withCredentials: true,
          headers: {
            "X-Headless-CMS": true,
          },
        }
      )
      .then((res) => {
        console.log("card added", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => addToCart(product?.id ?? 0)}
        className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
      >
        Ajouter au panier
        <span className="sr-only">, {product.name}</span>
      </button>
    </div>
  );
};

export default AddToCart;
