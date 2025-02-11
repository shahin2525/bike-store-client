import { Button, Space, Table, TableColumnsType } from "antd";
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
  useUpdateOrderMutation,
} from "../../../redux/feature/order/orderApi";
import { TOrder } from "../../../types/order.type";
import { toast } from "sonner";
export type TTableData = Pick<
  TOrder,
  "product" | "email" | "status" | "_id" | "quantity"
>;
const ManageOrder = () => {
  const {
    data: orderData,
    isLoading,
    isFetching,
  } = useGetAllOrderQuery(undefined);
  const [deleteOrder, { isLoading: deleteIsLoading }] =
    useDeleteOrderMutation();

  const [updateOrder, { isLoading: blockIsLoading }] = useUpdateOrderMutation();

  // console.log("bikeData", bikeData);
  const tableData = orderData?.data?.map(
    ({ _id, product, email, quantity, status }: TOrder) => ({
      key: _id,
      product,
      email,
      quantity,
      status,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Product Id",
      key: "product",
      dataIndex: "product",
    },

    {
      title: "Customer Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Order Status",
      key: "status",
      dataIndex: "status",
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
        const handleDeleteOrder = async (id: string) => {
          const toastId = toast.loading("deleting .....");
          try {
            const res = await deleteOrder(id).unwrap();
            if (res?.error) {
              toast.error(res.error.data.message, { id: toastId });
            } else {
              toast.success("order deleted successfully", { id: toastId });
            }
          } catch (error) {}
        };
        //deactivate user
        const handleUpdateOrder = async (id: string) => {
          const toastId = toast.loading("updating order .....");
          const updateOrderData = {
            id,
            data: {
              status: "Delivered",
            },
          };

          try {
            const res = await updateOrder(updateOrderData).unwrap();
            if (res?.error) {
              toast.error(res.error.data.message, { id: toastId });
            } else {
              toast.success("order updated successfully", { id: toastId });
            }
          } catch (error) {}
        };

        return (
          <Space>
            <Button
              type="primary"
              onClick={() => handleUpdateOrder(item?.key)}
              disabled={deleteIsLoading}
            >
              Update Order status
            </Button>
            {/* <Link to={`/update-user/${item?.key}`}>
              <Button type="primary">Update</Button>
            </Link> */}
            <Button
              type="primary"
              onClick={() => handleDeleteOrder(item?.key)}
              disabled={deleteIsLoading}
            >
              Delete Order
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
