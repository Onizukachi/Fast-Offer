import api from "@utils/jwtInterceptor.js";
import { API_BACK_BASE_URL } from "@constants/api.js";

export const deleteQuestionQuery = async (questionId) => {
  const { data } = await api.delete(
    `${API_BACK_BASE_URL}/api/v1/questions/${questionId}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return data;
};