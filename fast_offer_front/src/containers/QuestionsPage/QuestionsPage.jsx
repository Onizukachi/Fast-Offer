import { useQuery } from "react-query";
import { useState, useCallback, useRef, useEffect } from "react";
import { questionsQuery } from "./queries";
import Question from "@components/Question";
import { deserialize } from "deserialize-json-api";
import InfiniteScroll from "react-infinite-scroll-component";
import BeatLoader from "react-spinners/BeatLoader";
import { Input, Switch } from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from "lodash";
import { Button } from "@nextui-org/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showToast } from "@utils/toast";
import { UNPERMITTED } from "@constants/toastMessages";
import { positionsQuery } from "@queries/positionsQuery";
import { gradesQuery } from "@queries/gradesQuery";
import FiltersBlock from "@components/Questions/FiltersBlock";
import Orders from "@components/Questions/Orders/Orders.jsx";

const LIMIT_PER_PAGE = 10;
const SORT_FIELDS = ["created_at", "answers_count"];
const ORDER_OPTIONS = [
  { key: "desc", label: "По возрастанию" },
  { key: "asc", label: "По убыванию" },
];

const mergeQueryParams = (params) => ({
  searchTerm: params.get("q") || "",
  selectedGradeId: params.get("grade_id") || null,
  selectedPositionIds:
    params
      .get("position_ids")
      ?.split(",")
      ?.filter((el) => el !== "") || [],
  sortBy: SORT_FIELDS.includes(params.get("sort")) ? params.get("sort") : "",
  sortOrder: ORDER_OPTIONS.map((el) => el.key).includes(params.get("order"))
    ? params.get("order")
    : "asc",
  selectedTag: params.get("tag") || null,
});

const QuestionsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [questionsData, setQuestionsData] = useState([]);
  const [positions, setPositions] = useState([]);
  const [grades, setGrades] = useState([]);
  const [filters, setFilters] = useState(mergeQueryParams(searchParams));
  const hasMoreRef = useRef(false);
  const cursorRef = useRef(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setFilters(mergeQueryParams(searchParams));
  }, [searchParams]);

  const toggleFilters = () => setShowFilters(!showFilters);

  const resetMeta = useCallback(() => {
    setQuestionsData([]);
    cursorRef.current = null;
    hasMoreRef.current = false;
  });

  const cleanRefetch = useCallback(() => {
    resetMeta();
    refetch();
  });

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      resetMeta();
      setSearchParams(
        (prev) => {
          prev.set("q", searchTerm);
          return prev;
        },
        { replace: true },
      );
    }, 500), // Debounce for 500 milliseconds
    [searchParams],
  );

  const handleGradeChange = useCallback(
    (gradeId) => {
      resetMeta();
      setSearchParams(
        (prev) => {
          if (gradeId !== filters.selectedGradeId) {
            prev.set("grade_id", gradeId);
          } else {
            prev.delete("grade_id");
          }

          return prev;
        },
        { replace: true },
      );
    },
    [searchParams, filters.selectedGradeId],
  );

  const handleTagClick = useCallback(
    (tag) => {
      resetMeta();
      setSearchParams(
        (prev) => {
          if (tag !== filters.selectedTag) {
            prev.set("tag", tag);
          } else {
            prev.delete("tag");
          }

          return prev;
        },
        { replace: true },
      );
    },
    [searchParams, filters.selectedTag],
  );

  const handlePositionsChange = useCallback(
    (positionIds) => {
      resetMeta();
      setSearchParams(
        (prev) => {
          prev.set(
            "position_ids",
            Array.from(positionIds)
              .map((el) => Number(el))
              .filter((el) => el !== 0)
              .join(","),
          );

          return prev;
        },
        { replace: true },
      );
    },
    [searchParams],
  );

  const handleSortingChange = useCallback(
    (field, direction) => {
      resetMeta();
      setSearchParams(
        (prev) => {
          if (
            !direction ||
            (filters.sortBy === field && filters.sortOrder === direction)
          ) {
            prev.delete("sort");
            prev.delete("order");
          } else {
            prev.set("sort", field);
            prev.set("order", direction);
          }

          return prev;
        },
        { replace: true },
      );
    },
    [searchParams, filters.sortBy, filters.sortOrder],
  );

  const queryParams = {
    after: cursorRef.current,
    limit: LIMIT_PER_PAGE,
    query: filters.searchTerm,
    grade_id: filters.selectedGradeId,
    position_ids: filters.selectedPositionIds,
    sort: filters.sortBy,
    order: filters.sortOrder,
    tag: filters.selectedTag,
  };

  const { isLoading, refetch } = useQuery(
    [filters],
    () =>
      questionsQuery(queryParams)
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

  useQuery(
    `positions`,
    () =>
      positionsQuery().then((data) => {
        setPositions(deserialize(data).data);
      }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  useQuery(
    `grades`,
    () =>
      gradesQuery().then((data) => {
        setGrades(deserialize(data).data);
      }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center flex-wrap gap-6">
        <Switch onChange={toggleFilters}>Фильтры</Switch>
        <div className="max-w-2xl w-full">
          <Input
            isDisabled={isLoading}
            type="search"
            size="lg"
            onValueChange={handleSearch}
            placeholder="Поиск по вопросам"
            startContent={
              <IoSearchOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <Button
          onClick={() => navigate("/questions/new", { replace: false })}
          color="primary"
          size="lg"
          variant="shadow"
        >
          Задать вопрос
        </Button>
      </div>
      {showFilters && (
        <div className="flex flex-wrap gap-6 justify-center mt-3">
          <FiltersBlock
            isLoading={isLoading}
            selectedGradeId={filters.selectedGradeId}
            handleGradeChange={handleGradeChange}
            grades={grades}
            selectedPositionIds={filters.selectedPositionIds}
            handlePositionsChange={handlePositionsChange}
            positions={positions}
          />
          <Orders
            isLoading={isLoading}
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            handleSortingChange={handleSortingChange}
          />
        </div>
      )}
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
              handleTagClick={handleTagClick}
              handleGradeClick={handleGradeChange}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default QuestionsPage;
