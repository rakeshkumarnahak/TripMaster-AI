import HotelCard from "./HotelCard";

const Hotels = ({ hotels }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
        {hotels?.map((hotel, index) => (
          <div key={index} className="hover:scale-105 transition-all">
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
