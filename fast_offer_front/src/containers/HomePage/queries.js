import api from "@utils/jwtInterceptor.js";
import { API_BACK_BASE_URL } from "@constants/api.js";

export const positionsQuery = async () => {
  // почему здесь запрос на api протестируй локально измени только у нжинс маппинг  в конфиге
  console.log("Я СЕЙЧАС ВЫЗОВУСЬ")
  console.log(API_BACK_BASE_URL)
  const { data } = await api.get(`${API_BACK_BASE_URL}/api/v1/positions`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  return data;
};
