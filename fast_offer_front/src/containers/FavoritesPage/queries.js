import api from "@utils/jwtInterceptor.js";
import { API_BACK_BASE_URL } from "@constants/api.js";

export const favoritesQuery = async () => {
  const { data } = await api.get(
    `${API_BACK_BASE_URL}/api/v1/favorites`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return data;
};

export const createAnswerQuery = async (questionId, body) => {
  const { data } = await api.post(
    `${API_BACK_BASE_URL}/api/v1/questions/${questionId}/answers`,
    {
      headers: {
        Accept: "application/json",
      },
      answer: {
        body: body,
      },
    },
  );

  return data;
};

export const updateAnswerQuery = async (questionId, answerId, body) => {
  const { data } = await api.patch(
    `${API_BACK_BASE_URL}/api/v1/questions/${questionId}/answers/${answerId}`,
    {
      headers: {
        Accept: "application/json",
      },
      answer: {
        body: body,
      },
    },
  );

  return data;
};

export const deleteAnswerQuery = async (questionId, answerId) => {
  const { data } = await api.delete(
    `${API_BACK_BASE_URL}/api/v1/questions/${questionId}/answers/${answerId}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return data;
};
