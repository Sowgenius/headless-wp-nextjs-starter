const Error = ({ errors, fieldName }) => {
  return (
    errors &&
    (errors.hasOwnProperty(fieldName) ? (
      <div className="invalid-feedback d-block block text-sm font-regular text-red-500">
        {" "}
        {errors[fieldName]}
      </div>
    ) : null)
  );
};

export default Error;
