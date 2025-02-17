import { Button, Space, Table, TableColumnsType } from "antd";
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
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

    isFetching,
  } = useGetAllOrderQuery(undefined);
  const [deleteOrder, { isLoading: deleteIsLoading }] =
    useDeleteOrderMutation();

  // const [updateOrder, { isLoading: updateIsLoading }] =
  //   useUpdateOrderMutation();

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
      // responsive: ["md"],
      // width: "auto",
      // minWidth: 150, // ✅ Ensure visibility
    },

    {
      title: "Customer Email",
      key: "email",
      dataIndex: "email",
      responsive: ["xs", "sm", "md", "lg"],
      // responsive: ["md"],
      // width: "auto",
      // minWidth: 200,
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
          } catch (error: any) {
            toast.error(error.data.message, { id: toastId });
          }
        };

        return (
          <Space>
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

export default ManageOrder;
