import InputField from "./form-elements/input-field";
import PropTypes from "prop-types";
const Address = ({
  input,
  countries,
  states,
  handleOnChange,
  isFetchingStates,
  isShipping,
}) => {
  const { errors } = input || {};

  return (
    <>
      <div className="sm:col-span-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputField
              name="firstName"
              inputValue={input?.firstName}
              required
              handleOnChange={handleOnChange}
              label="Prénom"
              errors={errors}
              isShipping={isShipping}
              autoComplete="given-name"
              containerClassnames="woo-inputField-checkout"
            />
          </div>
          <div>
            <InputField
              name="lastName"
              inputValue={input?.lastName}
              required
              handleOnChange={handleOnChange}
              label="Nom"
              errors={errors}
              isShipping={isShipping}
              autoComplete="family-name"
              containerClassnames="woo-inputField-checkout"
            />
          </div>
        </div>
      </div>
      <div className="sm:col-span-3">
        <InputField
          name="company"
          inputValue={input?.company}
          handleOnChange={handleOnChange}
          label="Entreprise (optionnel)"
          errors={errors}
          isShipping={isShipping}
          autoComplete="organization"
          containerClassnames="woo-inputField-checkout"
        />
      </div>
      {/*
        <CountrySelection
            input={input}
            handleOnChange={handleOnChange}
            countries={countries}
            isShipping={isShipping}
        />
        */}
      <div className="sm:col-span-3">
        <InputField
          name="address1"
          inputValue={input?.address1}
          handleOnChange={handleOnChange}
          required
          label="Adresse de livraison"
          errors={errors}
          isShipping={isShipping}
          autoComplete="adress-line1"
          containerClassnames="woo-inputField-checkout"
          placeholder="Villa N46, Rue 10 Medina "
        />
      </div>
      <div className="sm:col-span-3">
        <InputField
          name="address2"
          inputValue={input?.address2}
          handleOnChange={handleOnChange}
          label="N* Appartement, etages, etc... "
          errors={errors}
          isShipping={isShipping}
          autoComplete="adress-line2"
          containerClassnames="woo-inputField-checkout"
          placeholder="Appartement 10, 2e étages..."
        />
      </div>
      <div className="sm:col-span-3">
        <InputField
          name="city"
          inputValue={input?.city}
          required
          handleOnChange={handleOnChange}
          label="Region/Ville"
          errors={errors}
          isShipping={isShipping}
          containerClassnames="woo-inputField-checkout"
        />
      </div>
    </>
  );
};

Address.propTypes = {
  input: PropTypes.object,
  countries: PropTypes.array,
  handleOnChange: PropTypes.func,
  isFetchingStates: PropTypes.bool,
  isShipping: PropTypes.bool,
};

Address.defaultProps = {
  input: {},
  countries: [],
  handleOnChange: () => {},
  isFetchingStates: false,
  isShipping: false,
};
export default Address;
