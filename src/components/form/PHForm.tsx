import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
type TUserConfig = {
  defaultValues?: Record<string, unknown>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
};
type TFromProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TUserConfig;

const PHForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: TFromProps) => {
  const userConfig: TUserConfig = {};

  if (defaultValues) {
    userConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    userConfig["resolver"] = resolver;
  }
  const method = useForm(userConfig);

  const submit = (data: FieldValues) => {
    method.reset();
    onSubmit(data);
  };
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
