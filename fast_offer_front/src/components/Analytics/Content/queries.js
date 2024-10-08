import api from "@utils/jwtInterceptor.js";
import { API_BACK_BASE_URL } from "@constants/api.js";

export const analyticsQuery = async (positionId) => {
  const { data } = await api.get(`${API_BACK_BASE_URL}/api/v1/analytics`, {
    headers: {
      'Accept': 'application/json'
    },
    params: {
      position_id: positionId
    }
  });

  return data;
};
