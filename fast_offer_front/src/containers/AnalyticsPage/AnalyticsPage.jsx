import { useState, useMemo, useCallback } from "react";
import { useQuery } from "react-query";
import { analyticsQuery } from "./queries";
import {
  Table,
  Spinner,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { useMediaQuery } from '@mui/material';
import { positionsQuery } from "@queries/positionsQuery";
import { deserialize } from "deserialize-json-api";
import { useSearchParams } from "react-router-dom";
import PositionSelector from "@components/Analytics/PositionSelector";

const ROWS_PER_PAGE = 5;

const AnalyticsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [positions, setPositions] = useState([]);
  const [skills, setSkills] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [chartData, setChartData] = useState({});
  const [skillsPage, setSkillsPage] = useState(1);
  const [employersPage, setEmployersPage] = useState(1);
  const selectedPositionId = searchParams.get("position_id") || null;
  const skillsPages = Math.ceil(skills.length / ROWS_PER_PAGE);
  const employersPages = Math.ceil(employers.length / ROWS_PER_PAGE);

  const resetPages = () => {
    setSkillsPage(1);
    setEmployersPage(1);
  };

  const skillsPagination = useMemo(() => {
    const start = (skillsPage - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;

    return skills.slice(start, end);
  }, [skillsPage, skills]);

  const employersPagination = useMemo(() => {
    const start = (employersPage - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;

    return employers.slice(start, end);
  }, [employersPage, employers]);

  const { isSuccess, isLoading } = useQuery(
    [{ selectedPositionId: selectedPositionId }],
    () =>
      analyticsQuery(selectedPositionId)
        .then((data) => {
          resetPages();
          setEmployers(data.employers);
          setSkills(
            data.skills.map(([key, value]) => ({ skill: key, count: value })),
          );
          setChartData(data.chart_data);
        })
        .catch((error) => {
          resetPages();
          console.log(error);
        }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  const handlePositionChange = useCallback((positionId) => {
    setSearchParams(
      (prev) => {
        prev.set("position_id", positionId);

        return prev;
      },
      { replace: true },
    );
  }, [setSearchParams]);

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

  const isSmallScreen = useMediaQuery('(max-width:640px)');

  return (
    <div className='flex flex-col gap-10'>
    <PositionSelector
      positions={positions}
      selectedId={selectedPositionId}
      handleChange={handlePositionChange}
    />
    <div className="flex flex-wrap gap-10 justify-center">
      {isLoading && <Spinner size="lg" color="primary" />}
      {isSuccess && (
        <>
          <Table
            aria-label="skills table"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={skillsPage}
                  total={skillsPages}
                  onChange={(page) => setSkillsPage(page)}
                />
              </div>
            }
            classNames={{
              base: "max-w-fit",
            }}
          >
            <TableHeader>
              <TableColumn key="skill">Навык</TableColumn>
              <TableColumn key="count">Упоминаний</TableColumn>
            </TableHeader>
            <TableBody items={skillsPagination}>
              {(skill) => (
                <TableRow key={skill.skill}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(skill, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Table
            aria-label="employers table"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={employersPage}
                  total={employersPages}
                  onChange={(page) => setEmployersPage(page)}
                />
              </div>
            }
            classNames={{
              base: "max-w-fit",
            }}
          >
            <TableHeader>
              <TableColumn key="name">Работодатель</TableColumn>
            </TableHeader>
            <TableBody items={employersPagination}>
              {(employer) => (
                <TableRow key={employer.name}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(employer, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <LineChart
            width={isSmallScreen ? 400 : 800}
            height={300}
            series={[
              {
                data: Object.values(chartData),
                label: "Количество вакансий",
                area: true,
                showMark: false,
              },
            ]}
            xAxis={[{ scaleType: "point", data: Object.keys(chartData) }]}
            sx={{
              [`& .${lineElementClasses.root}`]: {
                display: "none",
              },
            }}
          />
        </>
      )}
    </div>
    </div>
  );
};

export default AnalyticsPage;
