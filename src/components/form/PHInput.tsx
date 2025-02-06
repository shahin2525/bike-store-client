import { Controller } from "react-hook-form";

const PHInput = ({ type, name, label }) => {
  return (
    <>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => <input type={type} {...field} id={name} />}
      />
    </>
  );
};

export default PHInput;
