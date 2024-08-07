import {GRAVATAR_BASE_URL, GRAVATAR_DEFAULT_IMG_URL} from "@constants/gravatar.js";

export const gravatarUrl = (hash) => {
  return `${GRAVATAR_BASE_URL}/${hash}?d=${GRAVATAR_DEFAULT_IMG_URL}`
}
