import { Link } from "react-router-dom";
import placeholderImage from "../../assets/placeholder.webp";
import { useEffect, useState } from "react";
import { getPlaceData, PHOTO_URL } from "@/services/globalApis";

const HotelCard = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    const fetchImageUrl = async () => {
      const data = {
        textQuery: hotel.hotelName,
      };
      const response = await getPlaceData(data);
      const bestImage = filterBestResolutionImage(
        response.data.places[0].photos
      );
      const photo_url_ref = PHOTO_URL.replace("{NAME}", bestImage.name);
      setPhotoUrl(photo_url_ref);
    };

    fetchImageUrl();
  }, [hotel]);

  const filterBestResolutionImage = (photos) => {
    const filteredImages = photos
      .filter(
        (photo) =>
          photo.heightPx >= 1480 &&
          photo.heightPx <= 1440 &&
          photo.widthPx >= 640 &&
          photo.widthPx <= 2560
      )
      .sort((a, b) => b.widthPx - a.widthPx);

    if (filteredImages.length === 0) {
      //Sorting in descending order
      photos.sort((a, b) => b.widthPx - a.widthPx);

      return photos[2];
    }
    return filteredImages[0];
  };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName}+${hotel.hotelAddress}`}
      target="_blank"
    >
      <img
        src={photoUrl ? photoUrl : placeholderImage}
        alt={`Cover image for {hotel.hotelName}`}
        className="rounded-xl h-44 w-full object-cover"
      />
      <div className="my-2 flex flex-col gap-2">
        <h2 className="font-medium">{hotel.hotelName}</h2>
        <h2 className="text-xs text-gray-500">📍{hotel.hotelAddress}</h2>
        <h2 className="text-sm font-medium">💰{hotel.price}</h2>
        <h2 className="text-sm font-medium">⭐{hotel.rating}</h2>
      </div>
    </Link>
  );
};

export default HotelCard;
