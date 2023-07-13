import PropTypes from "prop-types";

const CheckboxField = ({
  handleOnChange,
  checked,
  name,
  label,
  placeholder,
  containerClassNames,
}) => {
  return (
    <div className={containerClassNames}>
      <input
        onChange={handleOnChange}
        placeholder={placeholder}
        type="checkbox"
        checked={checked}
        name={name}
        id={name}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 "
      />
      <div className="ml-2">
        <label htmlFor={name} className="text-sm font-medium text-gray-900 ">
          Cochez ici si les informations de facturations diffèrent
        </label>
      </div>
    </div>
  );
};

CheckboxField.propTypes = {
  handleOnChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  containerClassNames: PropTypes.string,
};

CheckboxField.defaultProps = {
  handleOnChange: () => null,
  checked: false,
  name: "",
  label: "",
  placeholder: "",
  errors: {},
  containerClassNames: "",
};

export default CheckboxField;
