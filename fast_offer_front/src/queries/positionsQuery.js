import api from "@utils/jwtInterceptor";
import { API_BACK_BASE_URL } from "@constants/api";

export const positionsQuery = async () => {
  const { data } = await api.get(`${API_BACK_BASE_URL}/api/v1/positions`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  return data;
};
