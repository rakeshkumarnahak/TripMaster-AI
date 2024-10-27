import placeholderImage from "../../assets/placeholder.webp";
import { IoIosSend } from "react-icons/io";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getPlaceData, PHOTO_URL } from "@/services/globalApis";
import { Badge } from "../ui/badge";

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
      <div className="my-5 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl">
            {tripData?.userSelection?.location?.label}
          </h2>
          <Button className="h-7 w-7 md:h-fit md:w-fit">
            <IoIosSend />
          </Button>
        </div>
        <div className="flex justify-between ">
          <div className="hidden md:flex items-center gap-2">
            {/* Badges for larger screen */}
            <Badge
              variant="outline"
              className="bg-gray-200 text-xs md:text-normal"
            >
              📆 {tripData?.userSelection?.noOfDays} Day
            </Badge>
            <Badge variant="outline" className="bg-gray-200">
              💰 {tripData?.userSelection?.budget} budget
            </Badge>
            <Badge variant="outline" className="bg-gray-200">
              🥂 No of travelers: {tripData?.userSelection?.travelers}
            </Badge>
          </div>

          {/* Badges for smaller screen */}
          <div className="flex items-center gap-2 md:hidden">
            <Badge variant="outline" className="bg-gray-200">
              {tripData?.userSelection?.noOfDays} Day
            </Badge>
            <Badge variant="outline" className="bg-gray-200">
              {tripData?.userSelection?.budget} budget
            </Badge>
            <Badge variant="outline" className="bg-gray-200">
              {tripData?.userSelection?.travelers}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
