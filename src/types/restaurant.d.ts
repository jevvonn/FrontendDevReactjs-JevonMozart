interface Restaurant {
  createdAt: string;
  name: string;
  categories: string[];
  is_open: boolean;
  price_start_range: number;
  price_end_range: number;
  images: string[];
  rating: number;
  reviews: RestaurantReview[];
  google_maps_url: string;
  id: string;
}

interface RestaurantReview {
  user: {
    name: string;
    image: string;
  };
  rating: number;
  text: string;
}

export { Restaurant, RestaurantReview, PRICE_MAP, PriceLevel };
