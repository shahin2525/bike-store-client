export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TError = {
  data: {
    message: string;

    stack: string;

    success: boolean;
  };

  status: number;
};
export type TMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};
