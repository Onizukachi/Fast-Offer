import { useQuery } from "react-query";
import { useState, useCallback, useRef, useEffect, useContext } from "react";
import { questionsQuery } from "./queries";
import Question from "@components/Question";
import { deserialize } from "deserialize-json-api";
import InfiniteScroll from "react-infinite-scroll-component";
import BeatLoader from "react-spinners/BeatLoader";
import { Switch } from "@nextui-org/react";
import { debounce } from "lodash";
import { Button } from "@nextui-org/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showToast } from "@utils/toast";
import { UNATHORIZED, UNPERMITTED } from "@constants/toastMessages";
import { positionsQuery } from "@queries/positionsQuery";
import { gradesQuery } from "@queries/gradesQuery";
import Sorting from "@components/Questions/Sorting";
import AuthContext from "@context/AuthContext";
import SearchInput from "@components/Questions/SearchInput";
import DifficultySelector from "@components/Questions/DifficultySelector/index.js";
import PositionSelector from "@components/Questions/PositionSelector/index.js";

const LIMIT_PER_PAGE = 10;
const SORT_FIELDS = ["created_at", "answers_count"];
const ORDER_OPTIONS = [
  { key: "desc", label: "По возрастанию" },
  { key: "asc", label: "По убыванию" },
];

// Здесь есть проблема с лишними рендерами. Так как при изменении любого фильтра, обновляется весь filter из query params
// и соответственно, значения внутри обьекта этого, если они не число например, буду создаваться заново, массивы и тд
// и триггерить перерндер дочерних компонентов, хотя содержимое осталось прежним
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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [questionsData, setQuestionsData] = useState([]);
  const [positions, setPositions] = useState([]);
  const [grades, setGrades] = useState([]);
  const [filters, setFilters] = useState(mergeQueryParams(searchParams));
  const hasMoreRef = useRef(false);
  const cursorRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchWasFocusRef = useRef(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setFilters(mergeQueryParams(searchParams));
  }, [searchParams]);

  useEffect(() => {
    if (searchWasFocusRef.current === true) searchInputRef.current?.focus();
  }, [questionsData]);

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
    [],
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
    [filters.selectedGradeId],
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
    [filters.selectedTag],
  );

  const handlePositionsChange = useCallback((positionIds) => {
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
  }, []);

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
    [filters.sortBy, filters.sortOrder],
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

  const { refetch } = useQuery(
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

  const handleCreateQuestion = () => {
    if (!user) {
      showToast(UNATHORIZED, "warning");
      return;
    }

    navigate("/questions/new", { replace: false });
  };

  const handleSearchFocus = useCallback(() => {
    searchWasFocusRef.current = true;
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center flex-wrap gap-6">
        <Switch onChange={toggleFilters}>Фильтры</Switch>
        <div className="max-w-2xl w-full">
          <SearchInput
            inputRef={searchInputRef}
            onFocus={handleSearchFocus}
            onChange={handleSearch}
          />
        </div>
        <Button
          onClick={handleCreateQuestion}
          color="primary"
          size="lg"
          variant="shadow"
        >
          Создать вопрос
        </Button>
      </div>
      {showFilters && (
        <div className="flex flex-wrap gap-6 justify-center mt-3">
          <DifficultySelector
            grades={grades}
            selectedId={filters.selectedGradeId}
            onChange={handleGradeChange}
          />
          <PositionSelector
            positions={positions}
            selectedIds={filters.selectedPositionIds}
            onChange={handlePositionsChange}
          />
          <Sorting
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
