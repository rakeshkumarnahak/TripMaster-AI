import { Link } from "react-router-dom";
import placeholderImage from "../../assets/placeholder.webp";
import { useEffect, useState } from "react";
import { getPlaceData, PHOTO_URL } from "@/services/globalApis";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    const fetchImageUrl = async () => {
      const data = {
        textQuery: place.placeName,
      };
      const response = await getPlaceData(data);
      const bestImage = filterBestResolutionImage(
        response.data.places[0].photos
      );
      const photo_url_ref = PHOTO_URL.replace("{NAME}", bestImage.name);
      setPhotoUrl(photo_url_ref);
    };

    fetchImageUrl();
  }, [place]);

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
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}+${place.geoCoordinates.latitude}%2C${place.geoCoordinates.longitude}`}
      target="_blank"
    >
      <div className="border rounded-xl shadow-md p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all">
        <img
          src={photoUrl ? photoUrl : placeholderImage}
          alt={`Cover image for ${place.placeName}`}
          className="w-32 h-32 object-cover rounded-xl "
        />
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-md md:text-normal lg:text-lg">
            {place.placeName}
          </h2>
          <p className="hidden lg:flex text-xs md:text-sm text-gray-500">
            {place.placeDetails}
          </p>
          <p className="lg:hidden text-xs lg:text-sm text-gray-500">
            {place.placeDetails.length > 150
              ? `${place.placeDetails.slice(0, 150)}... `
              : place.placeDetails}
          </p>
          <p className="text-gray-800 text-sm md:text-md">
            ⏱ {place.timeTaken}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
