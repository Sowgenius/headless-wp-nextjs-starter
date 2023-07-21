import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Error from "./form-elements/error";
import { getShippingMethods } from "../../utils/fetch-shipping-methods";

const ShippingOptions = ({ input, handleOnChange }) => {
  const { errors, shippingMethod } = input || {};

  const [shippingMethods, setShippingMethods] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    fetchShippingMethods();
  }, []);

  const fetchShippingMethods = async () => {
    const shippingMethodsData = await getShippingMethods();
    setShippingMethods(shippingMethodsData);
  };

  const handleShippingChange = (event) => {
    // Update the shipping cost based on the selected shipping method
    const selectedShippingMethod = shippingMethods.find(
      (method) => method.id === event.target.value
    );

    if (selectedShippingMethod && selectedShippingMethod.settings) {
      const costType = selectedShippingMethod.settings.cost_type;
      const cost = parseFloat(selectedShippingMethod.settings.cost);

      if (costType === "fixed") {
        setShippingCost(cost);
      } else if (costType === "class") {
        // You may implement additional logic here based on the "class" cost type
        // For example, you can calculate the shipping cost based on the order details
        // and the shipping class.
        // This will depend on your specific shipping setup in WooCommerce.
        // For simplicity, we'll just set the shipping cost to 0 for the "class" type.
        setShippingCost(0);
      }
    }

    handleOnChange(event); // Pass the event to the parent component
  };

  return (
    <>
      <div className="mt-3">
        <Error errors={errors} fieldName={"shippingMethod"} />
      </div>
      <div>
        <h3>Select Shipping Method:</h3>
        <RadioGroup value={shippingMethod} onChange={handleShippingChange}>
          <RadioGroup.Label className="sr-only">
            Shipping Method
          </RadioGroup.Label>
          <div className="space-y-2">
            {shippingMethods?.map((method) => (
              <RadioGroup.Option key={method.id} value={method.id}>
                {({ checked }) => (
                  <div
                    className={`border rounded p-2 ${
                      checked ? "bg-indigo-200" : ""
                    }`}
                  >
                    <RadioGroup.Label
                      as="span"
                      className={`font-bold ${
                        checked ? "text-indigo-600" : ""
                      }`}
                    >
                      {method.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="p"
                      className={`text-sm ${checked ? "text-indigo-700" : ""}`}
                    >
                      {/* Display additional information about the shipping method if needed */}
                    </RadioGroup.Description>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div>
        {/* Display the calculated shipping cost */}
        <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
      </div>
    </>
  );
};

export default ShippingOptions;
