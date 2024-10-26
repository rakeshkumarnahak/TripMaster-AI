import Hotels from "@/components/custom/Hotels";
import InformationSection from "@/components/custom/InformationSection";
import PlacesToVisit from "@/components/custom/PlacesToVisit";
import { db } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState({
    id: "",
    tripData: {},
    userEmail: "",
    userSelection: {
      location: { label: "" },
      noOfDays: "",
      budget: "",
      travelers: "",
    },
  });

  useEffect(() => {
    const fetchTripData = async () => {
      if (tripId) {
        try {
          const docRef = doc(db, "AllTrips", tripId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // console.log("Document data fetched successfully:", docSnap.data());
            setTripData(docSnap.data());
          } else {
            console.log("No Such Document exists in Firestore");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      } else {
        console.log("tripId is undefined or null");
      }
    };

    fetchTripData();
  }, [tripId]);

  if (tripData) {
    return (
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        {/* Information Page */}
        <InformationSection tripData={tripData} />
        {/* Hotels */}
        <Hotels hotels={tripData?.tripData?.hotelOptions} />
        {/* Places to visit */}
        <PlacesToVisit itinerary={tripData?.tripData?.itinerary} />
      </div>
    );
  }
};

export default ViewTrip;
