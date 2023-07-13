import Error from "./form-elements/error";
import { isEmpty, map } from "lodash";
import Abbr from "./form-elements/abbr";

const CountrySelection = ({ input, handleOnChange, countries, isShipping }) => {
  const { country, errors } = input || {};

  const inputId = `country-${isShipping ? "shipping" : "billing"}`;

  return (
    <div className="mb-3">
      <label className="leading-7 text-sm text-gray-700" htmlFor={inputId}>
        Pays
        <Abbr required />
      </label>
      <div className="relative w-full border-none">
        <select
          onChange={handleOnChange}
          value={country}
          name="country"
          className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          id={inputId}
        >
          <option value="">Votre pays...</option>
          {!isEmpty(countries) &&
            map(countries, (country) => (
              <option
                key={country?.countryCode}
                data-countrycode={country?.countryCode}
                value={country?.countryCode}
              >
                {country?.countryName}
              </option>
            ))}
        </select>
        <span className="absolute right-0 top-1/4 mr-1 text-gray-500"></span>
      </div>
      <Error errors={errors} fieldName={"country"} />
    </div>
  );
};

export default CountrySelection;
