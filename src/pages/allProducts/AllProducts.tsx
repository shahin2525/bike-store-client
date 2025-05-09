// import { toast } from "sonner";
// import { useGetAllBikeQuery } from "../../redux/feature/bike/bikApi";
// import AllProductCard from "./AllProductCard";
// import { TBike } from "../../types/bike.type";
// import { useEffect, useState } from "react";
// import { Input, Select } from "antd";
// // import BSSelect from "../../components/form/BSSelect";
// // import { bikeCategoriesOptions } from "../../constants/global.const";

// import {
//   bikeCategoriesOptions,
//   bikeModelOptions,
//   brandsOptions,
// } from "../../constants/global.const";

// const { Search } = Input;
// const AllProducts = () => {
//   // console.log("useGet", useGetAllBikeQuery);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filters, setFilters] = useState<{ name: string; value: string }[]>([]);

//   const queryParams = [...filters];

//   // If searchTerm exists, add it to queryParams
//   if (searchTerm) {
//     queryParams.push({ name: "search", value: searchTerm });
//   }

//   const { data, isFetching } = useGetAllBikeQuery(queryParams);
//   // console.log("data", data);

//   useEffect(() => {
//     if (isFetching) {
//       const id = toast.loading("Data is loading...");

//       // Dismiss after 2 seconds
//       setTimeout(() => {
//         toast.dismiss(id);
//       }, 2000);
//     }
//   }, [isFetching]); // Only depends on `isFetching`

//   if (isFetching && data === undefined) {
//     return null;
//   }

//   const onSearch = (value: string) => {
//     setSearchTerm(value);
//   };

//   const handleFilterChange = (key: string, value: string) => {
//     setFilters((prev) => {
//       // Remove previous filter with the same key
//       const updatedFilters = prev.filter((filter) => filter.name !== key);
//       // Add the new filter if a value is selected
//       if (value) {
//         updatedFilters.push({ name: key, value });
//       }
//       return updatedFilters;
//     });
//   };
//   return (
//     <div className="mt-5" style={{ marginTop: "20px", padding: "0px 10px" }}>
//       <div className="lg:flex items-center justify-center gap-2">
//         <Search
//           style={{ width: "200px" }}
//           placeholder="Search bikes..."
//           allowClear
//           enterButton="Search"
//           size="large"
//           onSearch={onSearch}
//         />

//         {/* Filter Dropdowns */}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
//           <Select
//             placeholder="Filter Brand"
//             style={{ width: "150px" }}
//             onChange={(value) => handleFilterChange("brand", value)}
//             options={brandsOptions}
//             allowClear
//           ></Select>

//           <Select
//             placeholder="Filter Model"
//             style={{ width: "150px" }}
//             onChange={(value) => handleFilterChange("model", value)}
//             allowClear
//             options={bikeModelOptions}
//           ></Select>

//           <Select
//             placeholder="Filter Category"
//             style={{ width: "150px" }}
//             onChange={(value) => handleFilterChange("category", value)}
//             options={bikeCategoriesOptions}
//             allowClear
//           ></Select>
//         </div>
//       </div>
//       <div
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
//         style={{ marginTop: "34px", marginBottom: "20px" }}
//       >
//         {data?.data?.map((bike: TBike) => (
//           <AllProductCard key={bike._id} bike={bike}></AllProductCard>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
import { useState, useEffect, useRef } from "react";
import {
  Drawer,
  Input,
  Select,
  Pagination,
  Row,
  Col,
  Button,
  Space,
  Spin,
  Grid,
  Card,
  Typography,
} from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useGetAllBikeQuery } from "../../redux/feature/bike/bikApi";
import AllProductCard from "./AllProductCard";
import { TBike } from "../../types/bike.type";
import {
  bikeCategoriesOptions,
  bikeModelOptions,
  brandsOptions,
} from "../../constants/global.const";

const { Search } = Input;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const PAGE_SIZE = 6;

const AllProducts = () => {
  const screens = useBreakpoint();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<{ name: string; value: string }[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Get all bikes data without pagination parameters
  // const { data, isFetching } = useGetAllBikeQuery({
  //   params: [
  //     ...filters,
  //     ...(searchTerm ? [{ name: "search", value: searchTerm }] : []),
  //   ],
  // });

  const { data, isFetching } = useGetAllBikeQuery([
    ...filters,
    ...(searchTerm ? [{ name: "search", value: searchTerm }] : []),
  ]);

  useEffect(() => {
    let toastId: string | number | undefined;

    if (isFetching) {
      toastId = toast.loading("Loading bikes...");
    } else {
      toast.dismiss(); // This dismisses all toasts or use toast.dismiss(toastId) if you want to dismiss only that one
    }

    // optional: return cleanup to clear toasts on unmount
    return () => {
      if (toastId !== undefined) {
        toast.dismiss(toastId);
      }
    };
  }, [isFetching]);
  // const toastIdRef = useRef<string | number>();

  // useEffect(() => {
  //   if (isFetching) {
  //     toastIdRef.current = toast.loading("Loading bikes...");
  //   } else if (toastIdRef.current !== undefined) {
  //     toast.dismiss(toastIdRef.current);
  //     toastIdRef.current = undefined;
  //   }
  // }, [isFetching]);

  // Frontend pagination logic
  const paginatedBikes = () => {
    if (!data?.data) return [];
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return data.data.slice(startIndex, startIndex + PAGE_SIZE);
  };

  const filteredBikes = paginatedBikes();
  const totalItems = data?.data?.length || 0;

  const onSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      const updatedFilters = prev.filter((filter) => filter.name !== key);
      if (value) {
        updatedFilters.push({ name: key, value });
      }
      return updatedFilters;
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const resetFilters = () => {
    setFilters([]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div style={{ padding: screens.xs ? "16px" : "24px" }}>
      <Row gutter={[24, 24]}>
        {/* Sidebar Filters - Desktop */}
        {!screens.xs && (
          <Col xs={0} md={6} lg={5} xl={4}>
            <Card bordered={false} style={{ background: "#fafafa" }}>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Title level={5} style={{ marginBottom: 16 }}>
                  Search & Filter
                </Title>

                <Search
                  placeholder="Search bikes..."
                  allowClear
                  enterButton={<SearchOutlined />}
                  size="large"
                  onSearch={onSearch}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Select
                  placeholder="Brand"
                  style={{ width: "100%" }}
                  onChange={(value) => handleFilterChange("brand", value)}
                  options={brandsOptions}
                  allowClear
                />

                <Select
                  placeholder="Model"
                  style={{ width: "100%" }}
                  onChange={(value) => handleFilterChange("model", value)}
                  options={bikeModelOptions}
                  allowClear
                />

                <Select
                  placeholder="Category"
                  style={{ width: "100%" }}
                  onChange={(value) => handleFilterChange("category", value)}
                  options={bikeCategoriesOptions}
                  allowClear
                />

                <Button onClick={resetFilters} block>
                  Reset Filters
                </Button>
              </Space>
            </Card>
          </Col>
        )}

        {/* Mobile Filter Button */}
        {screens.xs && (
          <Col span={24}>
            <Button
              icon={<FilterOutlined />}
              type="primary"
              onClick={() => setShowFilters(true)}
              block
            >
              Filters
            </Button>
          </Col>
        )}

        {/* Main Content */}
        <Col xs={24} md={18} lg={19} xl={20}>
          {isFetching && !data ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <Spin size="large" />
            </div>
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {filteredBikes.map((bike: TBike) => (
                  <Col key={bike._id} xs={24} sm={12} md={12} lg={8} xl={6}>
                    <AllProductCard bike={bike} />
                  </Col>
                ))}
              </Row>

              {totalItems > 0 && (
                <div style={{ marginTop: 24, textAlign: "center" }}>
                  <Pagination
                    current={currentPage}
                    pageSize={PAGE_SIZE}
                    total={totalItems}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                  />
                </div>
              )}

              {!isFetching && totalItems === 0 && (
                <div style={{ textAlign: "center", padding: "40px" }}>
                  <Title level={4}>No bikes found</Title>
                  <Button type="link" onClick={resetFilters}>
                    Reset filters
                  </Button>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>

      {/* Mobile Filter Drawer */}
      <Drawer
        title="Filters"
        placement="left"
        open={showFilters}
        onClose={() => setShowFilters(false)}
        width={300}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Search
            placeholder="Search bikes..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={onSearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select
            placeholder="Brand"
            style={{ width: "100%" }}
            onChange={(value) => handleFilterChange("brand", value)}
            options={brandsOptions}
            allowClear
          />

          <Select
            placeholder="Model"
            style={{ width: "100%" }}
            onChange={(value) => handleFilterChange("model", value)}
            options={bikeModelOptions}
            allowClear
          />

          <Select
            placeholder="Category"
            style={{ width: "100%" }}
            onChange={(value) => handleFilterChange("category", value)}
            options={bikeCategoriesOptions}
            allowClear
          />

          <Button onClick={resetFilters} block>
            Reset Filters
          </Button>
        </Space>
      </Drawer>
    </div>
  );
};

export default AllProducts;
