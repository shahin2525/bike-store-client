import { Button, Space, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import {
  useDeleteBikeMutation,
  useGetAllBikeQuery,
} from "../../../redux/feature/bike/bikApi";
import { TBike } from "../../../types/bike.type";

export type TTableData = Pick<TBike, "name" | "model" | "brand" | "_id">;

const ManageBike = () => {
  const {
    data: bikeData,
    isLoading,
    isFetching,
  } = useGetAllBikeQuery(undefined);
  const [deleteBike, { isError }] = useDeleteBikeMutation();
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
        const handleDeleteBike = (id: string) => {
          deleteBike(id);
        };
        return (
          <Space>
            <Link to={`/update-bike/${item?.key}`}>
              <Button type="primary">Update</Button>
            </Link>
            <Button type="primary" onClick={() => handleDeleteBike(item?.key)}>
              Delete Bike
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
