import api from "@utils/jwtInterceptor.js";
import { API_BACK_BASE_URL } from "@constants/api.js";

export const questionsQuery = async (params) => {
  console.log(import.meta.env.VITE_API_BASE_URL)
  console.log(import.meta.env.VITE_NODE_ENV)

  const { data } = await api.get(`${API_BACK_BASE_URL}/api/v1/questions`, {
    headers: {
      'Accept': 'application/json'
    },
    params: params
  });

  return data;
};
