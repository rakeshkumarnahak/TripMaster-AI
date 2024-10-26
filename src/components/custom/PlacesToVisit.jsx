import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ itinerary }) => {
  return (
    <div>
      <h2 className="font-bold text-lg mt-8">Places to visit</h2>
      <div>
        {itinerary?.map((item, index) => (
          <div key={index} className=" mt-4">
            <h2 className="text-lg font-semibold mb-2">Day {item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item?.plan?.map((place, index) => (
                <div key={index}>
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.timeSpan}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
