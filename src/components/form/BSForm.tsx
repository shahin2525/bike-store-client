import { ReactNode } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
// type TUserConfig = {
//   defaultValues?: Record<string, unknown>;

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   resolver?: any;
// };
// type TFromProps = {
//   onSubmit: SubmitHandler<FieldValues>;
//   children: ReactNode;
//   formMethods?: ReturnType<typeof useForm>;
// } & TUserConfig;

// const PHForm = ({
//   children,
//   onSubmit,
//   defaultValues,
//   resolver,
//   formMethods,
// }: TFromProps) => {
//   const userConfig: TUserConfig = {};

//   if (defaultValues) {
//     userConfig["defaultValues"] = defaultValues;
//   }
//   if (resolver) {
//     userConfig["resolver"] = resolver;
//   }
//   const method = formMethods || useForm({ defaultValues, resolver });

//   const submit = (data: FieldValues) => {
//     method.reset();
//     onSubmit(data);
//   };
type TUserConfig<T extends FieldValues> = {
  defaultValues?: Partial<T>;
  resolver?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

type TFormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  formMethods?: UseFormReturn<T>;
} & TUserConfig<T>;

const PHForm = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  resolver,
  formMethods,
}: TFormProps<T>) => {
  // const methods = formMethods || useForm<T>({ defaultValues, resolver });
  const methods =
    formMethods ||
    useForm<T>({
      defaultValues: defaultValues as DefaultValues<T>,
      resolver,
    });

  const submit = (data: T) => {
    methods.reset();
    onSubmit(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
      {/* <Button htmlType="button" onClick={() => method.reset()}>
        Reset Form
      </Button> */}
    </FormProvider>
  );
};

export default PHForm;
