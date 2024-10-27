import { useEffect, useState } from "react";
import placeholderImage from "../../assets/placeholder.webp";
import { getPlaceData, PHOTO_URL } from "@/services/globalApis";
import { Link } from "react-router-dom";

const TripCard = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    const fetchImageUrl = async () => {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      const response = await getPlaceData(data);
      const bestImage = filterBestResolutionImage(
        response.data.places[0].photos
      );
      const photo_url_ref = PHOTO_URL.replace("{NAME}", bestImage.name);
      setPhotoUrl(photo_url_ref);
    };

    fetchImageUrl();
  }, [trip]);

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
    <Link to={`/trips/${trip.id}`}>
      <div className="flex flex-col gap-2 hover:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : placeholderImage}
          alt={`Cover image of ${trip.userSelection.location.label}`}
          className="rounded-xl object-cover h-40 md:h-60 w-full"
        />
        <div>
          <h2 className="font-semibold text-base md:text-lg">
            {trip.userSelection.location.label}
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            {trip.userSelection.noOfDays} Days trip with{" "}
            {trip.userSelection.budget} budget for{" "}
            {trip.userSelection.travelers}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
