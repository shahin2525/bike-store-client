import { toast } from "sonner";
import { useGetAllBikeQuery } from "../../redux/feature/bike/bikApi";
import AllProductCard from "./AllProductCard";
import { TBike } from "../../types/bike.type";
import { useEffect } from "react";

const AllProducts = () => {
  const { data, isFetching } = useGetAllBikeQuery(undefined);

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
  return (
    <div>
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
