import { GROUP_ID, ACCESS_TOKEN, VERSION } from "./consts.js";

export const getGroupMembers = (filter) => {
  const params = new URLSearchParams({
    group_id: String(GROUP_ID),
    filter: filter,                 // ВАРИАНТ 2: filter
    fields: "photo_200,sex,bdate",
    access_token: ACCESS_TOKEN,
    v: VERSION,
  });
  return `https://api.vk.com/method/groups.getMembers?${params.toString()}`;
};

export const getUser = (id) => {
  const params = new URLSearchParams({
    user_ids: String(id),
    fields: "photo_400_orig,sex,bdate,city",
    access_token: ACCESS_TOKEN,
    v: VERSION,
  });
  return `https://api.vk.com/method/users.get?${params.toString()}`;
};
