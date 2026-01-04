import axios from "axios";

export const saveOrUpdateUser = async (user) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, user);
  return res.data;
};
