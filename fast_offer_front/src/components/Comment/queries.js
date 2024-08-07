import api from "@utils/jwtInterceptor.js";
import { API_BACK_BASE_URL } from "@constants/api.js";

export const createCommentQuery = async (commentableId, commentableType, body) => {
  const { data } = await api.post(
    `${API_BACK_BASE_URL}/api/v1/comments`,
    {
      headers: {
        Accept: "application/json",
      },
      params: {
        commentable_id: commentableId,
        commentable_type: commentableType
      },
      comment: {
        body: body
      },
    },
  );

  return data;
};

export const updateCommentQuery = async (commentId, body) => {
  const { data } = await api.patch(
    `${API_BACK_BASE_URL}/api/v1/comments/${commentId}`,
    {
      headers: {
        Accept: "application/json",
      },
      comment: {
        body: body,
      },
    },
  );

  return data;
};

export const deleteCommentQuery = async (commentId) => {
  const { data } = await api.delete(
    `${API_BACK_BASE_URL}/api/v1/comments/${commentId}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return data;
};
