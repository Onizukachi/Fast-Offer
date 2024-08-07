import { useState, useEffect } from "react";

function useLikeState(likeable) {
  const [likeState, setLikeState] = useState({
    isLiked: likeable.liked,
    likesCount: likeable.likes_count,
  });

  useEffect(() => {
    setLikeState({
      isLiked: likeable.liked,
      likesCount: likeable.likes_count,
    });
  }, [likeable.likes_count, likeable.liked]);

  const handleLikeUpdate = (newIsLiked, likesCountDelta) => {
    setLikeState((prevState) => ({
      isLiked: newIsLiked,
      likesCount: prevState.likesCount + likesCountDelta,
    }));
  };

  return [likeState, handleLikeUpdate];
}

export default useLikeState;
