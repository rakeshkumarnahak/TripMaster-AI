import TripCard from "@/components/custom/TripCard";
import { db } from "@/services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const AllTrips = () => {
  const [allTrips, setAllTrips] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getAllTrips = async () => {
      const q = query(
        collection(db, "AllTrips"),
        where("userEmail", "==", user?.email)
      );

      const querySnapshot = await getDocs(q);
      setAllTrips([]);
      querySnapshot.forEach((doc) => {
        setAllTrips((previousValue) => [...previousValue, doc.data()]);
      });
    };
    getAllTrips();
  }, []);

  return (
    <div>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-2xl md:text-3xl">My Trips</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
          {allTrips.length > 0
            ? allTrips.map((trip, index) => (
                <TripCard key={index} trip={trip} />
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-60 w-full rounded-xl animate-pulse bg-gray-200"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AllTrips;
