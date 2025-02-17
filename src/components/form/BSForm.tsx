import { ReactNode } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";

type TUserConfig<T extends FieldValues> = {
  defaultValues?: Partial<T>;
  resolver?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

type TFormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  formMethods?: UseFormReturn<T>;
} & TUserConfig<T>;

const BSForm = <T extends FieldValues>({
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
    </FormProvider>
  );
};

export default BSForm;
