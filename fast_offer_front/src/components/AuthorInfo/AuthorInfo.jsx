import PropTypes from "prop-types";
import { gravatarUrl } from "@utils/gravatarUrl.js";

const AuthorInfo = ({ author }) => (
  <a className="flex items-center" href="#">
    <img
      className="ml-0 mr-4 sm:mx-4 w-10 h-10 object-cover rounded-full sm:block"
      src={gravatarUrl(author.gravatar_hash)}
      alt="avatar"
    />
    <h1 className="text-medium font-bold">{author.nickname}</h1>
  </a>
);

AuthorInfo.propTypes = {
  author: PropTypes.object,
};

export default AuthorInfo;
