import axios from "axios";
import * as React from "react";

const Stocks = (): JSX.Element => {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api")
      .then((data: any) => {
        setData(data.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loding...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {data.map((stock: { id: number; name: string }) => (
        <div key={stock.id}>{stock.name}</div>
      ))}
    </div>
  );
};

export default Stocks;
