import axios from "axios";

export const saveOrUpdateUser = async (user) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, user);
    return res.data;
  } catch (error) {
    console.error("Error saving user:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to save user data"
    );
  }
};
