// export type TUser = {
//   name: string;
//   email: string;
//   password: string;
//   role: string;
//   deactivate: boolean;
//   __v: number;
//   _id: string;
// };
export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  address?: string;
  city?: string;
  deactivate: boolean;

  createdAt: string;
  updatedAt: string;
};
