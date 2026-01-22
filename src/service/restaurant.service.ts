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

const getSpecificRestaurant = async (id: string) => {
  try {
    const response = await api.get<Restaurant>(`/restaurant/${id}`);
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch restaurant", {
      cause: err,
    });
  }
};

export { getAllRestaurants, getSpecificRestaurant };
