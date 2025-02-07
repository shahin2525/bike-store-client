import { toast } from "sonner";
import { useGetAllBikeQuery } from "../../redux/feature/bike/bikApi";
import AllProductCard from "./AllProductCard";
import { TBike } from "../../types/bike.type";
import { useEffect, useState } from "react";
import { Input, Select } from "antd";
const { Option } = Select;
// filter api http://localhost:3000/api/products?brand=Road Runner
// search api http://localhost:3000/api/products?search=Road Runner
// type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<{ name: string; value: string }[]>([]);

  const queryParams = [...filters];

  // If searchTerm exists, add it to queryParams
  if (searchTerm) {
    queryParams.push({ name: "search", value: searchTerm });
  }

  const { data, isFetching } = useGetAllBikeQuery(queryParams);

  useEffect(() => {
    if (isFetching) {
      const id = toast.loading("Data is loading...");

      // Dismiss after 2 seconds
      setTimeout(() => {
        toast.dismiss(id);
      }, 2000);
    }
  }, [isFetching]); // Only depends on `isFetching`

  if (isFetching && data === undefined) {
    return null;
  }

  const onSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      // Remove previous filter with the same key
      const updatedFilters = prev.filter((filter) => filter.name !== key);
      // Add the new filter if a value is selected
      if (value) {
        updatedFilters.push({ name: key, value });
      }
      return updatedFilters;
    });
  };
  return (
    <div className="mt-5" style={{ marginTop: "20px" }}>
      <div className="lg:flex items-center justify-center gap-2">
        <Search
          style={{ width: "200px" }}
          placeholder="Search bikes..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />

        {/* Filter Dropdowns */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <Select
            placeholder="Select Brand"
            style={{ width: "150px" }}
            onChange={(value) => handleFilterChange("brand", value)}
            allowClear
          >
            <Option value="Road Runner">Road Runner</Option>
            <Option value="Yamaha">Yamaha</Option>
            <Option value="Honda">Honda</Option>
          </Select>

          <Select
            placeholder="Select Model"
            style={{ width: "150px" }}
            onChange={(value) => handleFilterChange("model", value)}
            allowClear
          >
            <Option value="RX100">RX100</Option>
            <Option value="CBR 150">CBR 150</Option>
            <Option value="R15">R15</Option>
          </Select>

          <Select
            placeholder="Select Category"
            style={{ width: "150px" }}
            onChange={(value) => handleFilterChange("category", value)}
            allowClear
          >
            <Option value="Sport">Sport</Option>
            <Option value="Cruiser">Cruiser</Option>
            <Option value="Scooter">Scooter</Option>
          </Select>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
        style={{ marginTop: "34px", marginBottom: "20px" }}
      >
        {data?.data?.map((bike: TBike) => (
          <AllProductCard key={bike._id} bike={bike}></AllProductCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
