import { Table } from "antd";

const ManageOrder = () => {
  const {
    data: orderData,
    isLoading,
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
    },

    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },

    // {
    //   title: "Action",
    //   key: "x",
    //   render: (item) => {
    //     // console.log("item", item);
    //     const handleDeleteUser = async (id: string) => {
    //       const toastId = toast.loading("deleting .....");
    //       try {
    //         const res = await deleteBike(id).unwrap();
    //         if (res?.error) {
    //           toast.error(res.error.data.message, { id: toastId });
    //         } else {
    //           toast.success("bike deleting successfully", { id: toastId });
    //         }
    //       } catch (error) {}

    //     };

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
          } catch (error) {}
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
          } catch (error) {}
        };

        return (
          <Space>
            <Button
              type="primary"
              onClick={() => handleDeactivateUser(item?.key)}
              disabled={deleteIsLoading}
            >
              Deactivate User
            </Button>
            <Link to={`/update-user/${item?.key}`}>
              <Button type="primary">Update</Button>
            </Link>
            <Button
              type="primary"
              onClick={() => handleDeleteUser(item?.key)}
              disabled={deleteIsLoading}
            >
              Delete User
            </Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      pagination={false}
    />
  );
};

export default ManageOrder;
