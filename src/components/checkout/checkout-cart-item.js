import Image from "../image";
import { isEmpty } from "lodash";

const CheckoutCartItem = ({ item }) => {
  const productImg = item?.data?.images?.[0] ?? "";
  console.log("Cart Items: ", item);
  return (
    <>
      <li
        key={item?.productId ?? ""}
        className="flex items-start space-x-4 py-6"
      >
        <Image
          width="50"
          height="50"
          altText={productImg?.alt ?? ""}
          sourceUrl={!isEmpty(productImg?.src) ? productImg?.src : ""} // use normal <img> attributes as props
          className="h-20 w-20 flex-none rounded-md object-cover object-center"
        />
        <div className="flex-auto space-y-1">
          <h3>{item?.data?.name ?? ""}</h3>
          <p>x {item?.quantity ?? ""}</p>
        </div>
        <p className="flex-none text-base font-medium">
          {item?.currency ?? ""}
          {item?.line_subtotal ?? ""}
        </p>
      </li>

      {/**Example */}
      {/* <tr className="woo-next-cart-item" key={item?.productId ?? ""}>
        <td className="woo-next-cart-element">
          <figure>
            <Image
              width="50"
              height="50"
              altText={productImg?.alt ?? ""}
              sourceUrl={!isEmpty(productImg?.src) ? productImg?.src : ""} // use normal <img> attributes as props
            />
          </figure>
        </td>
        <td className="woo-next-cart-element">{item?.data?.name ?? ""}</td>
        <td className="woo-next-cart-element">
          {item?.currency ?? ""}
          {item?.line_subtotal ?? ""}
        </td>
      </tr> */}
    </>
  );
};

export default CheckoutCartItem;
