import { useGetAllBikeQuery } from "../../../redux/feature/bike/bikApi";

const Features = () => {
  const { data, isError, isFetching } = useGetAllBikeQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>I am from features</h1>
    </div>
  );
};

export default Features;
