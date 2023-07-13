import CountrySelection from "./country-selection";
import InputField from "./form-elements/input-field";
import PropTypes from "prop-types";
import StateSelection from "./state-selection";

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
              placeholder="Samba"
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
              placeholder="Cissé"
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
      <div className="sm:col-span-3">
        <InputField
          name="email"
          inputValue={input?.email}
          handleOnChange={handleOnChange}
          required
          label="Email"
          errors={errors}
          isShipping={isShipping}
          autoComplete="email"
          containerClassnames="woo-inputField-checkout"
          placeholder="sambacisse@oumouexpress.com "
        />
      </div>
      <div className="sm:col-span-3">
        {/* <PhoneInput
          country="SN"
          international
          withCountryCallingCode
          name="phone"
          value={input?.phone}
          //inputValue={input?.phone}
          onChange={handleOnChange}
          //handleOnChange={handleOnChange}
          label="Téléphone"
          errors={errors}
          isShipping={isShipping}
          autoComplete="tel"
          containerClassnames="woo-inputField-checkout"
          //inputComponent={InputField}
        /> */}
        <InputField
          name="phone"
          inputValue={input?.phone}
          handleOnChange={handleOnChange}
          required
          label="Téléphone"
          errors={errors}
          isShipping={isShipping}
          autoComplete="phone"
          containerClassnames="woo-inputField-checkout"
          placeholder="+221 77 576 87 98"
        />
      </div>
      <div className="sm:col-span-3">
        <CountrySelection
          input={input}
          handleOnChange={handleOnChange}
          countries={countries}
          isShipping={isShipping}
        />
      </div>

      <div className="sm:col-span-3">
        <StateSelection
          input={input}
          handleOnChange={handleOnChange}
          states={states}
          isFetchingStates={isFetchingStates}
          isShipping={isShipping}
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
      <div className="sm:col-span-3">
        <InputField
          name="address1"
          inputValue={input?.address1}
          handleOnChange={handleOnChange}
          required
          label="Adresse"
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
          label="Complément d'addresse "
          errors={errors}
          isShipping={isShipping}
          autoComplete="adress-line2"
          containerClassnames="woo-inputField-checkout"
          placeholder="Appart. 10, 2e étages..."
        />
      </div>
      <div className="sm:col-span-3">
        <InputField
          name="postcode"
          inputValue={input?.postcode}
          handleOnChange={handleOnChange}
          label="Code Postal "
          errors={errors}
          isShipping={isShipping}
          autoComplete="postcode"
          containerClassnames="woo-inputField-checkout"
          placeholder="Code Postal"
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
