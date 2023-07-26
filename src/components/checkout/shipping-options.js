import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Error from "./form-elements/error";

const ShippingOptions = ({
  input,
  handleOnChange,
  shippingZonesAndMethods,
}) => {
  const { errors, shippingZone, shippingMethod } = input || {};
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    // Set the initial shipping cost based on the selected shipping method
    calculateShippingCost();
  }, [shippingZonesAndMethods, shippingMethod]);

  const calculateShippingCost = () => {
    if (
      !shippingZonesAndMethods ||
      shippingZonesAndMethods.length === 0 ||
      !shippingMethod
    ) {
      // No shipping zones and methods available or no shipping method selected
      setShippingCost(0);
      return;
    }

    // Find the selected shipping zone and method
    const selectedShippingZone = shippingZonesAndMethods.find(
      (zone) => zone.zone.id === shippingZone
    );

    if (!selectedShippingZone) {
      // Selected shipping zone not found
      setShippingCost(0);
      return;
    }

    const selectedShippingMethod = selectedShippingZone.methods.find(
      (method) => method.id === shippingMethod
    );

    if (selectedShippingMethod && selectedShippingMethod.settings) {
      const costType = selectedShippingMethod.settings.cost_type;
      const cost = parseFloat(selectedShippingMethod.settings.cost);

      if (costType === "fixed") {
        setShippingCost(cost);
      } else if (costType === "class") {
        // Additional logic based on shipping class (if needed)
        // For simplicity, we'll set the shipping cost to 0 for the "class" type.
        setShippingCost(0);
      }
    }
  };

  const handleShippingChange = (event) => {
    handleOnChange(event);
  };

  return (
    <div>
      {/* Render the shipping options for the selected shipping zone */}
      {shippingZonesAndMethods.map((zone) => (
        <div key={zone.zone.id}>
          {zone.zone.id === shippingZone && (
            <div>
              {/* Display the available shipping methods for the selected zone */}
              <RadioGroup
                value={shippingMethod}
                onChange={handleShippingChange}
              >
                {zone.methods.map((method) => (
                  <RadioGroup.Option key={method.id} value={method.id}>
                    {method.title} - {method.method_title}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
              {/* Display the shipping cost for the selected method */}
              <p>Shipping Cost: {shippingCost}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShippingOptions;
