import { toast } from "sonner";
import { useGetAllBikeQuery } from "../../redux/feature/bike/bikApi";
import AllProductCard from "./AllProductCard";
import { TBike } from "../../types/bike.type";
import { useEffect, useState } from "react";
import { Input, Select } from "antd";
// import BSSelect from "../../components/form/BSSelect";
// import { bikeCategoriesOptions } from "../../constants/global.const";

import {
  bikeCategoriesOptions,
  bikeModelOptions,
  brandsOptions,
} from "../../constants/global.const";

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
    <div className="mt-5" style={{ marginTop: "20px", padding: "0px 10px" }}>
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
            placeholder="Filter Brand"
            style={{ width: "150px" }}
            onChange={(value) => handleFilterChange("brand", value)}
            options={brandsOptions}
            allowClear
          ></Select>

          <Select
            placeholder="Filter Model"
            style={{ width: "150px" }}
            onChange={(value) => handleFilterChange("model", value)}
            allowClear
            options={bikeModelOptions}
          ></Select>

          <Select
            placeholder="Filter Category"
            style={{ width: "150px" }}
            onChange={(value) => handleFilterChange("category", value)}
            options={bikeCategoriesOptions}
            allowClear
          ></Select>
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
