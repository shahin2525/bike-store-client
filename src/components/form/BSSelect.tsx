import { Form, Select } from "antd";
import { Control, Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  control?: Control<any>;
};
const BSSelect = ({
  label,
  name,
  options,
  disabled,
  control,
  mode,
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      control={control} //
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default BSSelect;
