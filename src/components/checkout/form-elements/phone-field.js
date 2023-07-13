import ReactPhoneNumberInput from "react-phone-number-input/input";
import PropTypes from "prop-types";
import InputField from "./input-field";

const PhoneNumberInputWrapper = ({
  handleOnChange,
  inputValue,
  name,
  label,
  errors,
  placeholder,
  required,
  containerClassnames,
  autoComplete,
  isShipping,
  country,
  international,
  withCountryCallingCode,
  ...restProps
}) => {
  return (
    <InputField
      handleOnChange={handleOnChange}
      inputValue={inputValue}
      name={name}
      label={label}
      errors={errors}
      placeholder={placeholder}
      required={required}
      containerClassnames={containerClassnames}
      autoComplete={autoComplete}
      isShipping={isShipping}
    >
      <ReactPhoneNumberInput
        value={inputValue}
        onChange={handleOnChange}
        country={country}
        international={international}
        withCountryCallingCode={withCountryCallingCode}
        {...restProps}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </InputField>
  );
};

PhoneNumberInputWrapper.propTypes = {
  handleOnChange: PropTypes.func,
  inputValue: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.object,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  containerClassnames: PropTypes.string,
  autoComplete: PropTypes.string,
  isShipping: PropTypes.bool,
  country: PropTypes.string,
  international: PropTypes.bool,
  withCountryCallingCode: PropTypes.bool,
};

PhoneNumberInputWrapper.defaultProps = {
  handleOnChange: () => null,
  inputValue: "",
  name: "",
  label: "",
  errors: {},
  placeholder: "",
  required: false,
  containerClassnames: "",
  autoComplete: "",
  isShipping: false,
  country: "",
  international: false,
  withCountryCallingCode: false,
};

export default PhoneNumberInputWrapper;
