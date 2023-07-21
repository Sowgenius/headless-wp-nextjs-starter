import { RadioGroup } from "@headlessui/react";
import Error from "./form-elements/error";
import fetchPaymentMethods from "../../utils/fetch-method-payments";

const PaymentModes = ({ input, handleOnChange, paymentMethods }) => {
  const { errors, paymentMethod } = input || {};

  return (
    <>
      <div className="mt-3">
        <Error errors={errors} fieldName={"paymentMethod"} />
      </div>
      <div>
        <h3>Choisissez votre mode de paiement:</h3>
        <RadioGroup value={paymentMethod} onChange={handleOnChange}>
          <RadioGroup.Label className="sr-only">
            Methodes de Paiement
          </RadioGroup.Label>
          <div className="space-y-2">
            {paymentMethods?.map((method) => (
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
                      {/* Display additional information about the payment method if needed */}
                    </RadioGroup.Description>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </>
  );
};

export default PaymentModes;

export async function getStaticProps() {
  const paymentMethods = await fetchPaymentMethods();
  return {
    props: {
      paymentMethods,
    },
    revalidate: 3600, // Optional: Control the revalidation interval (in seconds)
  };
}
