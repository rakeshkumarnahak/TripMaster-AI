import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.displayName", "places.id", "places.photos"],
  },
};

export const PHOTO_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1440&maxWidthPx=2560&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

export const getPlaceData = async (data) => {
  if (data.textQuery !== "") {
    return await axios.post(BASE_URL, data, config);
  }
};
