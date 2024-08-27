import PropTypes from "prop-types";
import { memo } from "react";
import moment from "moment/min/moment-with-locales";

const Title = memo(function Title({ analytic_log }) {
  return (
    <p className="text-center text-large">
      {`Анализ проведен ${moment(analytic_log.updated_at).format("DD.MM.YYYY HH:mm")}. Вакансий обработано: ${analytic_log.vacancies_processed}`}
    </p>
  );
});

Title.propTypes = {
  analytic_log: PropTypes.object,
};

export default Title;
