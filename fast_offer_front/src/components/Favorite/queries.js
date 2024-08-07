import api from "@utils/jwtInterceptor";
import { API_BACK_BASE_URL } from "@constants/api";

export const favoriteQuery = async (questionId) => {
  const { data } = await api.post(
    `${API_BACK_BASE_URL}/api/v1/favorites`,
    {
      headers: {
        Accept: "application/json",
      },
      question_id: questionId,
    },
  );

  return data;
};

export const unFavoriteQuery = async (questionId) => {
  const { data } = await api.delete(`${API_BACK_BASE_URL}/api/v1/favorites/unfavorite`, {
    headers: {
      Accept: "application/json",
    },
    params: {
      question_id: questionId,
    }
  });

  return data;
};
