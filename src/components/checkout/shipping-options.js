import { RadioGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import Error from "./form-elements/error";
import { getShippingZonesAndMethods } from "../../utils/fetch-shipping-methods";

const ShippingOptions = ({
  shippingZonesAndMethods,
  selectedStateCode,
  onShippingMethodChange,
}) => {
  const [loading, setLoading] = useState(true);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Simulate API call to fetch shipping methods based on the selected state code
    setTimeout(() => {
      const selectedShippingZone = shippingZonesAndMethods.find((zone) =>
        zone.locations.some((location) => location.code === selectedStateCode)
      );

      setShippingMethods(selectedShippingZone?.methods || []);
      setLoading(false);
    }, 1000); // Adjust the time as per your requirement or replace it with actual API call
  }, [shippingZonesAndMethods, selectedStateCode]);

  const handleChange = (selectedValue) => {
    console.log("Selected Value:", selectedValue);
    const selectedMethod = shippingMethods.find(
      (method) => method.id === selectedValue
    );
    console.log("Selected Method:", selectedMethod);
    if (selectedMethod) {
      const { title, id, settings } = selectedMethod;
      const total =
        settings.cost && settings.cost.value ? settings.cost.value : 0;

      //console.log("Selected Method-title:", title, "id", id, "total", total);

      setSelectedShippingMethod(title, id, total);
      const shippingLine = {
        method_title: title,
        method_id: id,
        total: total,
      };

      onShippingMethodChange(shippingLine); // Pass the selected method to the parent component
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading shipping methods...</p>
      ) : (
        <div>
          <div className="mt-3">
            <Error
              errors={shippingMethods.length === 0}
              fieldName="shippingMethod"
            />
          </div>
          <div>
            <h3>Choisissez votre mode de livraison:</h3>
            <RadioGroup
              value={selectedShippingMethod?.id}
              onChange={handleChange}
            >
              <RadioGroup.Label className="sr-only">
                Modes de Livraison
              </RadioGroup.Label>
              <div className="space-y-2">
                {shippingMethods.map((method) => (
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
                          className={`text-sm ${
                            checked ? "text-indigo-700" : ""
                          }`}
                        >
                          {method.settings?.cost?.value || 0}
                        </RadioGroup.Description>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingOptions;
