import { Button, Space, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import {
  useDeleteBikeMutation,
  useGetAllBikeQuery,
} from "../../../redux/feature/bike/bikApi";
import { TBike } from "../../../types/bike.type";
import { toast } from "sonner";

export type TTableData = Pick<TBike, "name" | "model" | "brand" | "_id">;

const ManageBike = () => {
  const {
    data: bikeData,
    isLoading,
    isFetching,
  } = useGetAllBikeQuery(undefined);
  const [deleteBike, { isError, isLoading: deleteIsLoading }] =
    useDeleteBikeMutation();
  console.log(isError);
  // console.log("bikeData", bikeData);
  const tableData = bikeData?.data?.map(
    ({ _id, model, name, brand }: TBike) => ({
      key: _id,
      name,
      brand,
      model,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },

    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
    },
    {
      title: "Model",
      key: "model",
      dataIndex: "model",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        // console.log("item", item);
        const handleDeleteBike = async (id: string) => {
          const toastId = toast.loading("deleting .....");
          try {
            const res = await deleteBike(id).unwrap();
            if (res?.error) {
              toast.error(res.error.data.message, { id: toastId });
            } else {
              toast.success("bike deleting successfully", { id: toastId });
            }
          } catch (error) {}
        };
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => handleDeleteBike(item?.key)}
              disabled={deleteIsLoading}
            >
              Deactivated User
            </Button>
            <Link to={`/update-bike/${item?.key}`}>
              <Button type="primary">Update</Button>
            </Link>
            <Button
              type="primary"
              onClick={() => handleDeleteBike(item?.key)}
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

export default ManageBike;
