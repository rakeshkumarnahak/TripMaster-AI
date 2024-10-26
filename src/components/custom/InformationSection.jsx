import placeholderImage from "../../assets/placeholder.webp";
import { IoIosSend } from "react-icons/io";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getPlaceData, PHOTO_URL } from "@/services/globalApis";

const InformationSection = ({ tripData }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    const fetchImageUrl = async () => {
      const data = {
        textQuery: tripData?.userSelection?.location?.label,
      };
      const response = await getPlaceData(data);
      const bestImage = filterBestResolutionImage(
        response?.data?.places[0].photos
      );
      const photo_url_ref = PHOTO_URL.replace("{NAME}", bestImage.name);
      setPhotoUrl(photo_url_ref);
    };

    fetchImageUrl();
  }, [tripData]);

  const filterBestResolutionImage = (photos) => {
    const filteredImages = photos
      ?.filter(
        (photo) =>
          photo.heightPx >= 1480 &&
          photo.heightPx <= 1440 &&
          photo.widthPx >= 640 &&
          photo.widthPx <= 2560
      )
      .sort((a, b) => b.widthPx - a.widthPx);

    if (filteredImages?.length === 0) {
      //Sorting in descending order
      photos.sort((a, b) => b.widthPx - a.widthPx);

      return photos[2];
    }
    return filteredImages[0];
  };

  return (
    <div>
      <img
        src={photoUrl ? photoUrl : placeholderImage}
        alt="placeholderImage"
        className="h-96 w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-5">
          <h2 className="font-bold text-3xl">
            {tripData?.userSelection?.location?.label}
          </h2>
          <div className="flex justify-between ">
            <div className="flex items-center gap-2">
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs md:text-sm lg:text-md">
                📆 {tripData?.userSelection?.noOfDays} Day
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs md:text-sm lg:text-md">
                💰 {tripData?.userSelection?.budget} budget
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs md:text-sm lg:text-md">
                🥂 No of travelers: {tripData?.userSelection?.travelers}
              </h2>
            </div>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};

export default InformationSection;
