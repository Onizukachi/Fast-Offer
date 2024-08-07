import api from "@utils/jwtInterceptor";
import { API_BACK_BASE_URL } from "@constants/api";

export const updateQuestionQuery = async (id, params) => {
  const { data } = await api.patch(`${API_BACK_BASE_URL}/api/v1/questions/${id}`, {
    headers: {
      Accept: "application/json",
    },
    question: params,
  });

  return data;
};
