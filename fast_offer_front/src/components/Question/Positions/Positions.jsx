import styles from "./Positions.module.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Positions = ({ positions }) => {
  return (
    <div className="flex gap-3">
      {positions.map((position) => (
        <NavLink key={position.id} to="/">
          <img
            className={styles.positionImg}
            src={(position.image_url)}
            alt={position.title}
          />
        </NavLink>
      ))}
    </div>
  )
};

Positions.propTypes = {
  positions: PropTypes.array,
};

export default Positions;
