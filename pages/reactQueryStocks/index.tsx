import axios from "axios";
import * as React from "react";
import { useQuery, useQueries, QueryClient } from "react-query";

const adaptData = (data: any) => {
  const res = data?.data?.map((stock: any) => ({
    id: stock.id,
    name: stock.name,
  }));

  if (!res) {
    return undefined;
  }
  return res;
};

const queryClient = new QueryClient();

const Stocks = (): JSX.Element => {
  const fetcher = React.useCallback(
    () => axios.get("http://localhost:3000/api"),
    []
  );

  // Parallel Queries
  // const {isLoading: loading1, data: data1} = useQuery(["stocks", 1],() => fetcher(1));
  // const {isLoading: loading2, data: data2} = useQuery(["stocks", 2],() => fetcher(2));

  //  Dynamic Parellel Queries
  //  const results = useQueries(
  //    stocks.map((stock) => {
  //      if (stock.id === 3 || stock.id === 4) {
  //        return {
  //          queryKey: ["stocks", stock.id],
  //          queryFn: () => fetcher(stock.id),
  //        };
  //      }
  //    })
  //  );

  // Dependent Queries
  //  const { isLoading, data, isError, error, isFetching, refetch } = useQuery<
  //    any,
  //    any,
  //    any
  //  >(["stocks"], fetcher);
  //  const isDataAvailable = data?.data?.[0];
  //  const { isLoading, data, isError, error, isFetching, refetch } = useQuery<
  //    any,
  //    any,
  //    any
  //  >(["stocks"], fetcher, { enabled: isDataAvailable});

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery<
    any,
    any,
    any
  >(["stocks"], fetcher, {
    cacheTime: 10 * 60 * 1000,
    staleTime: 30000,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: true,
    select: adaptData,
    onSuccess: (data) => {
      console.log("success");
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/*       
      keep enabled false -> to perform onClick fetching
      <button onClick={refetch}>Fetch Data</button> 
      */}
      {data?.map((stock: any) => (
        <div key={stock.id}>{stock.name}</div>
      ))}
    </div>
  );
};

export default Stocks;
