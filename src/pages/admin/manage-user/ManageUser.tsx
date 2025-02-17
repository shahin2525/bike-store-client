import { Button, Space, Table, TableColumnsType } from "antd";
import { TUser } from "../../../types/user.type";
import {
  useDeactivateUserMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../../../redux/feature/user/userApi";
import { toast } from "sonner";

export type TTableData = Pick<TUser, "name" | "email" | "role" | "_id">;
const ManageUser = () => {
  const {
    data: userData,

    isFetching,
  } = useGetAllUserQuery(undefined);
  const [deleteUser, { isLoading: deleteIsLoading }] = useDeleteUserMutation();

  const [deactivateUser, { isLoading: blockIsLoading }] =
    useDeactivateUserMutation();

  // console.log("bikeData", bikeData);
  const tableData = userData?.data?.map(
    ({ _id, name, email, role }: TUser) => ({
      key: _id,
      name,
      email,
      role,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      responsive: ["xs", "sm", "md", "lg"],
    },

    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      responsive: ["xs", "sm", "md", "lg"],
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        // console.log("item", item);
        const handleDeleteUser = async (id: string) => {
          const toastId = toast.loading("deleting .....");
          try {
            const res = await deleteUser(id).unwrap();
            if (res?.error) {
              toast.error(res.error.data.message, { id: toastId });
            } else {
              toast.success("user deleting successfully", { id: toastId });
            }
          } catch (error: any) {
            toast.error(error.data.message, { id: toastId });
          }
        };
        //deactivate user
        const handleDeactivateUser = async (id: string) => {
          const toastId = toast.loading("deactivating .....");
          const deactivateData = {
            id,
            data: {
              deactivate: true,
            },
          };

          try {
            const res = await deactivateUser(deactivateData).unwrap();
            if (res?.error) {
              toast.error(res.error.data.message, { id: toastId });
            } else {
              toast.success("user deactivated successfully", { id: toastId });
            }
          } catch (error: any) {
            toast.error(error.data.message, { id: toastId });
          }
        };

        return (
          <Space>
            <Button
              type="primary"
              onClick={() => handleDeactivateUser(item?.key)}
              disabled={blockIsLoading}
            >
              Deactivate Customer
            </Button>

            <Button
              type="primary"
              onClick={() => handleDeleteUser(item?.key)}
              disabled={deleteIsLoading}
            >
              Delete Customer
            </Button>
          </Space>
        );
      },
      width: "1%",
      responsive: ["sm", "md", "lg"],
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      pagination={{ pageSize: 5 }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default ManageUser;
