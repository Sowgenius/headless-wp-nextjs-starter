import PropTypes from "prop-types";
import { memo } from "react";
import cx from "classnames";
import Abbr from "./form-elements/abbr";
import Error from "./form-elements/error";

const StateSelection = ({
  handleOnChange,
  input,
  states,
  isFetchingStates,
  isShipping,
}) => {
  const { state, errors } = input || {};

  const inputId = `state-${isShipping ? "shipping" : "billing"}`;

  if (isFetchingStates) {
    // Show loading component.
    return (
      <div className="mb-3">
        <label className="leading-7 text-sm text-gray-700">
          Ville/Zone
          <Abbr required />
        </label>
        <div className="relative w-full border-none">
          <select
            disabled
            value=""
            name="state"
            className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">En cours...</option>
          </select>
        </div>
      </div>
    );
  }

  if (!states.length) {
    return null;
  }

  return (
    <div className="mb-3 woo-inputField-checkout">
      <label className="leading-7 text-sm text-gray-600" htmlFor={inputId}>
        Region/Ville
        <Abbr required />
      </label>
      <div className="relative w-full border-none">
        <select
          disabled={isFetchingStates}
          onChange={handleOnChange}
          value={state}
          name="state"
          className={cx(
            "relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm",
            { "opacity-50": isFetchingStates }
          )}
          id={inputId}
        >
          <option value="">Choisissez votre ville...</option>
          {states.map((state, index) => (
            <option
              key={state?.stateCode ?? index}
              value={state?.stateName ?? ""}
            >
              {state?.stateName}
            </option>
          ))}
        </select>
      </div>
      <Error errors={errors} fieldName={"state"} />
    </div>
  );
};

StateSelection.propTypes = {
  handleOnChange: PropTypes.func,
  input: PropTypes.object,
  states: PropTypes.array,
  isFetchingStates: PropTypes.bool,
  isShipping: PropTypes.bool,
};

StateSelection.defaultProps = {
  handleOnChange: () => null,
  input: {},
  states: [],
  isFetchingStates: false,
  isShipping: true,
};

export default memo(StateSelection);
