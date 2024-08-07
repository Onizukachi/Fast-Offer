import BeatLoader from "react-spinners/BeatLoader";
import Question from "@components/Question";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "react-query";
import { deserialize } from "deserialize-json-api";
import { showToast } from "@utils/toast.js";
import { UNPERMITTED } from "@constants/toastMessages";
import { favoritesQuery } from "./queries";
import { useCallback, useRef, useState } from "react";
import { normalizeCountForm } from "@utils/normalizeCountForm";

const FavoritesPage = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const hasMoreRef = useRef(false);
  const cursorRef = useRef(null);

  const resetMeta = useCallback(() => {
    setQuestionsData([]);
    cursorRef.current = null;
    hasMoreRef.current = false;
  });

  const cleanRefetch = useCallback(() => {
    resetMeta();
    refetch();
  });

  const { refetch } = useQuery(
    [],
    () =>
      favoritesQuery()
        .then((data) => {
          hasMoreRef.current = data.meta.has_next;
          cursorRef.current = data.meta.next_cursor;
          setQuestionsData((prevState) =>
            prevState.concat(deserialize(data).data),
          );
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.status === 401) showToast(UNPERMITTED, "warning");
        }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl text-center">{`В избранном ${questionsData.length} ${normalizeCountForm(questionsData.length, ["вопрос", "вопроса", "вопросов"])}`}</h1>
        <InfiniteScroll
          dataLength={questionsData.length}
          next={refetch}
          hasMore={hasMoreRef.current}
          loader={
            <BeatLoader
              className="mt-8 text-center"
              size="20px"
              color="#5c7de0"
            />
          }
        >
          {questionsData.map((question) => {
            return (
              <Question
                key={question.id}
                question={question}
                refetch={cleanRefetch}
                handleTagClick={() => console.log("Fake")}
                handleGradeClick={() => console.log("Fake")}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default FavoritesPage;
