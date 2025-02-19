import { Button, Space, Table, TableColumnsType } from "antd";
import {
  useDeleteOrderMutation,
  useGetAllOrderByEmailQuery,
} from "../../redux/feature/order/orderApi";
import { TOrder } from "../../types/order.type";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feature/auth/authSlice";

export type TTableData = Pick<
  TOrder,
  "product" | "email" | "status" | "_id" | "quantity"
>;
//
type Transaction = {
  bank_status: string;
  date_time: string;
  id: string;
  method: string;
  sp_code: string;
  sp_message: string;
  transactionStatus: string | null;
};

type Order = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  product: string;
  quantity: number;
  status: string;
  totalPrice: number;
  transaction: Transaction;
  __v: number;
};
//
const OrdersView = () => {
  const user = useAppSelector(selectCurrentUser);
  const email = user?.data?.email;

  const {
    data: orderData,

    isFetching,
  } = useGetAllOrderByEmailQuery(email);
  const [deleteOrder, { isLoading: deleteIsLoading }] =
    useDeleteOrderMutation();
  //TODO
  // const product = orderData?.data?.map((item: Order) => item.product);
  // console.log("product", product);
  // const { data: bike } = useGetSingleBikeQuery(product[0]);
  // console.log("bike", bike);
  const tableData = orderData?.data?.map(
    ({
      _id,
      product,
      email,
      quantity,
      status,
      totalPrice,
      transaction,
    }: Order) => ({
      key: _id,
      product,
      email,
      quantity,
      status,
      totalPrice,
      Estimated_delivery_date: transaction?.date_time,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Order Id",
      key: "key",
      dataIndex: "key",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Estimated Delivery Date",
      key: "Estimated_delivery_date",
      dataIndex: "Estimated_delivery_date",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Current Status",
      key: "status",
      dataIndex: "status",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Total Price",
      key: "totalPrice",
      dataIndex: "totalPrice",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
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
            {/* <Button type="primary" disabled>
              Update Order
            </Button> */}
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
