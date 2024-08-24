import { useState, useMemo } from "react";
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

const AnalyticsPage = () => {
  const [skills, setSkills] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [skillsPage, setSkillsPage] = useState(1);
  const [employersPage, setEmployersPage] = useState(1);
  const rowsPerPage = 10;

  const skillsPages = Math.ceil(skills.length / rowsPerPage);
  const employersPages = Math.ceil(employers.length / rowsPerPage);

  const skillsPagination = useMemo(() => {
    const start = (skillsPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return skills.slice(start, end);
  }, [skillsPage, skills]);

  const employersPagination = useMemo(() => {
    const start = (employersPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return employers.slice(start, end);
  }, [employersPage, employers]);

  const { isSuccess, isLoading } = useQuery(
    `analytics`,
    () =>
      analyticsQuery()
        .then((data) => {
          setEmployers(data.employers);
          setSkills(
            data.skills.map(([key, value]) => ({ skill: key, count: value })),
          );
        })
        .catch((error) => {
          console.log(error);
        }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  return (
    <div className="flex flex-wrap gap-14 justify-center">
      {isLoading && <Spinner size="lg" color="primary" />}
      {isSuccess && (
        <>
          <Table
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
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
