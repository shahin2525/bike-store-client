import { Button, Space, Table, TableColumnsType } from "antd";
import {
  useDeleteOrderMutation,
  useGetAllOrderByEmailQuery,
  useUpdateOrderMutation,
} from "../../redux/feature/order/orderApi";
import { TOrder } from "../../types/order.type";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feature/auth/authSlice";
export type TTableData = Pick<
  TOrder,
  "product" | "email" | "status" | "_id" | "quantity"
>;
const OrdersView = () => {
  const user = useAppSelector(selectCurrentUser);
  const email = user?.data?.email;

  const {
    data: orderData,

    isFetching,
  } = useGetAllOrderByEmailQuery(email);
  const [deleteOrder, { isLoading: deleteIsLoading }] =
    useDeleteOrderMutation();

  const [updateOrder, { isLoading: updateIsLoading }] =
    useUpdateOrderMutation();

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
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Customer Email",
      key: "email",
      dataIndex: "email",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Order Status",
      key: "status",
      dataIndex: "status",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        const handleDeleteOrder = async (id: string) => {
          const toastId = toast.loading("Deleting...");
          try {
            const res = await deleteOrder(id).unwrap();
            if (res?.error) {
              toast.error(res.error.data.message, { id: toastId });
            } else {
              toast.success("Order deleted successfully", { id: toastId });
            }
          } catch (error: any) {
            toast.error(error.data.message, { id: toastId });
          }
        };

        return (
          <Space>
            <Button type="primary" disabled>
              Update Order
            </Button>
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
      responsive: ["sm", "md", "lg"],
    },
  ];

  // const columns: TableColumnsType<TTableData> = [
  //   {
  //     title: "Product Id",
  //     key: "product",
  //     dataIndex: "product",
  //   },

  //   {
  //     title: "Customer Email",
  //     key: "email",
  //     dataIndex: "email",
  //   },
  //   {
  //     title: "Order Status",
  //     key: "status",
  //     dataIndex: "status",
  //   },

  //   {
  //     title: "Action",
  //     key: "x",
  //     render: (item) => {
  //       // console.log("item", item);
  //       const handleDeleteOrder = async (id: string) => {
  //         const toastId = toast.loading("deleting .....");
  //         try {
  //           const res = await deleteOrder(id).unwrap();
  //           if (res?.error) {
  //             toast.error(res.error.data.message, { id: toastId });
  //           } else {
  //             toast.success("order deleted successfully", { id: toastId });
  //           }
  //         } catch (error: any) {
  //           toast.error(error.data.message, { id: toastId });
  //         }
  //       };

  //       return (
  //         <Space>
  //           <Button
  //             type="primary"
  //             // onClick={() => handleUpdateOrder(item?.key)}
  //             disabled={updateIsLoading}
  //           >
  //             Update Order
  //           </Button>
  //           {/* <Link to={`/update-user/${item?.key}`}>
  //             <Button type="primary">Update</Button>
  //           </Link> */}
  //           <Button
  //             type="primary"
  //             onClick={() => handleDeleteOrder(item?.key)}
  //             disabled={deleteIsLoading}
  //           >
  //             Delete Order
  //           </Button>
  //         </Space>
  //       );
  //     },
  //     width: "1%",
  //   },
  // ];

  // return
  // (
  //   <Table
  //   loading={isFetching}
  //   columns={columns}
  //   dataSource={tableData}
  //   pagination={false}
  // />
  // );
  return (
    <div className="overflow-x-auto">
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }} // Enables horizontal scrolling
      />
    </div>
  );
};

export default OrdersView;
