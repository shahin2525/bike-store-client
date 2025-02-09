import { Button, Space, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { useGetAllBikeQuery } from "../../../redux/feature/bike/bikApi";
import { TBike } from "../../../types/bike.type";

export type TTableData = Pick<TBike, "name" | "model" | "brand" | "_id">;

const ManageBike = () => {
  const {
    data: bikeData,
    isLoading,
    isFetching,
  } = useGetAllBikeQuery(undefined);
  console.log("bikeData", bikeData);
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
        console.log("item", item);
        return (
          <Space>
            <Button>Update</Button>
            <Button>Block</Button>
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
