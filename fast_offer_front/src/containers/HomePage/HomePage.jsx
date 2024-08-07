import styles from "./HomePage.module.css";
import { useState } from 'react'
import { useQuery } from "react-query";
import { positionsQuery } from "./queries";
import { Spinner } from "@nextui-org/react";
import { deserialize } from "deserialize-json-api";
import { useDispatch } from "react-redux";
import { rememberPosition } from "@store/actions";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [positions, setPositions] = useState([])

  const { isSuccess, isLoading } = useQuery(
    `positions`,
    () =>
      positionsQuery(
      ).then((data) => {
        setPositions(deserialize(data).data)
      }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  const handleClick = (id) => {
    dispatch(rememberPosition(id));
    const params = new URLSearchParams({position_ids: id});
    navigate(`/questions?${params.toString()}`, { replace: false });
  }

  return (
    <div className="flex flex-wrap gap-12 justify-between">
      {isLoading && <Spinner size="lg" color="primary" />}
      {isSuccess &&
        positions.map((el) => {
          return (
            <button key={el.id} onClick={() => handleClick(el.id)}  className="flex items-center">
                <img
                  className={styles.logo}
                  src={el.image_url}
                  alt={el.title}
                ></img>

                <h4 className="font-bold text-large hover:opacity-80">
                  {el.title}
                </h4>
            </button>
          );
        })}
    </div>
  );
};

export default HomePage;
