import { useContext } from "react";
import AuthContext from "@context/AuthContext.jsx";
import { showToast } from "@utils/toast.js";
import { UNATHORIZED } from "@constants/toastMessages.js";
import { useMutation } from "react-query";
import PropTypes from "prop-types";
import { likeQuery, unLikeQuery } from "./queries.js";

const LikeButton = ({ likeableId, likeableType, isLiked, onLikeUpdate }) => {
  const { user } = useContext(AuthContext);

  const likeMutation = useMutation({
    mutationFn: () => likeQuery(likeableId, likeableType),
    onSuccess: () => {onLikeUpdate(true, 1)},
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const unLikeMutation = useMutation({
    mutationFn: () => unLikeQuery(likeableId, likeableType),
    onSuccess: () => {onLikeUpdate(false, -1)},
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleLike = () => {
    if (!user) {
      showToast(UNATHORIZED, "warning");
      return;
    }

    if (isLiked) {
      unLikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return (
    <div>
      <button onClick={handleLike}>
        {isLiked ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

LikeButton.propTypes = {
  onLikeUpdate: PropTypes.func,
  isLiked: PropTypes.bool,
  likesCount: PropTypes.number,
  likeableId: PropTypes.any,
  likeableType: PropTypes.string,
};

export default LikeButton;
