import api from "@utils/jwtInterceptor.js";
import { API_BACK_BASE_URL } from "@constants/api.js";

export const gradesQuery = async () => {
  const { data } = await api.get(`${API_BACK_BASE_URL}/api/v1/it_grades`, {
    headers: {
      Accept: "application/json",
    },
  });

  return data;
};
