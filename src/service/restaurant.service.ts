import api from "../config/axios";
import type { Restaurant } from "../types/restaurant";

const getAllRestaurants = async () => {
  try {
    const response = await api.get<Restaurant[]>("/restaurant");
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch restaurants", {
      cause: err,
    });
  }
};

export { getAllRestaurants };
