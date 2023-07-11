import Error from "./errors";
import Abbr from "./abbr";
import PropTypes from "prop-types";
const InputField = ({
  handleOnChange,
  inputValue,
  name,
  type,
  label,
  errors,
  placeholder,
  required,
  containerClassnames,
  autoComplete,
  isShipping,
}) => {
  const inputId = `${name}-${isShipping ? "shippping" : ""}`;

  return (
    <div className={containerClassnames}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label || ""}
        <Abbr required={required} />
      </label>
      <div className="mt-1">
        <input
          type={type}
          id={inputId}
          name={name}
          value={inputValue}
          onChange={handleOnChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <Error errors={errors} fieldName={name} />
      </div>
    </div>
  );
};

InputField.propTypes = {
  handleOnChange: PropTypes.func,
  inputValue: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.object,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  containerClassnames: PropTypes.string,
  autoComplete: PropTypes.string,
};

InputField.defaultProps = {
  handleOnChange: () => null,
  inputValue: "",
  name: "",
  type: "text",
  label: "",
  errors: {},
  placeholder: "",
  required: false,
  containerClassNames: "",
  autoComplete: "",
};

export default InputField;
