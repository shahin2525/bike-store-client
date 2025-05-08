import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TInput = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
  placeholder?: string;
  size?: "small" | "middle" | "large";
};
const BSInput = ({
  type,
  name,
  label,
  disabled,
  prefix,
  placeholder,
  size,
}: TInput) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {/* {label ? label : null} : */}
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              // size="large"
              disabled={disabled}
              prefix={prefix}
              placeholder={placeholder}
              size={size}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default BSInput;
