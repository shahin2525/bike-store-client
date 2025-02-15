import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TInput = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  marginBottom?: string;
};
const PHInput = ({ type, name, label, disabled, marginBottom }: TInput) => {
  return (
    // <div style={{ marginBottom: "20px" }}>
    //   {label ? label : null}
    //   <Controller
    //     name={name}
    //     render={({ field }) => <input type={type} {...field} id={name} />}
    //   />
    // </div>
    <div style={{ marginBottom }}>
      {/* {label ? label : null} : */}
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
