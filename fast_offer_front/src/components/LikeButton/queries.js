import api from "@utils/jwtInterceptor.js";
import { API_BACK_BASE_URL } from "@constants/api.js";

export const likeQuery = async (likeableId, likeableType) => {
  const { data } = await api.post(`${API_BACK_BASE_URL}/api/v1/likes`, {
    headers: {
      Accept: "application/json",
    },
    like: {
      likeable_id: likeableId,
      likeable_type: likeableType,
    },
  });

  return data;
};

export const unLikeQuery = async (likeableId, likeableType) => {
  const { data } = await api.delete(
    `${API_BACK_BASE_URL}/api/v1/likes/unlike`,
    {
      headers: {
        Accept: "application/json",
      },
      params: {
        likeable_id: likeableId,
        likeable_type: likeableType,
      },
    },
  );

  return data;
};
