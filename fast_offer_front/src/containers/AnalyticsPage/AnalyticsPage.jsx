import { useQuery } from "react-query";
import { positionsQuery } from "@queries/positionsQuery";
import { deserialize } from "deserialize-json-api";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Content from "@components/Analytics/Content";

const AnalyticsPage = () => {
  const [searchParams] = useSearchParams();
  const [positions, setPositions] = useState([]);

  const extractCurrPosition = () => {
    const idFromParam = searchParams.get("position_id");

    if (idFromParam) {
      return positions.find((position) => String(position.id) === idFromParam);
    } else {
      return positions.find((position) => position.title === "Ruby on Rails");
    }
  };

  const currPosition = extractCurrPosition();

  useQuery(
    `positions`,
    () =>
      positionsQuery()
        .then((data) => {
          const parsedData = deserialize(data).data;
          setPositions(parsedData);
        })
        .catch((error) => {
          console.log(error);
        }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  return (
    <>
      {currPosition && (
        <Content positions={positions} currPosition={currPosition} />
      )}
    </>
  );
};

export default AnalyticsPage;
