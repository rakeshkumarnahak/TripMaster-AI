export const selectTravelersList = [
  {
    id: 1,
    title: "Just me",
    description: "A Sole traveler in exploration",
    icon: "✈️",
    people: "1 person",
  },
  {
    id: 2,
    title: "A couple",
    description: "Two travelers in tandem",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    description: "A group of fun loving Adv",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    description: "A bunch of thrill-seekes",
    icon: "⛵",
    people: "5 to 10 people",
  },
];

export const selectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    description: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    description: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    description: "Don't worry about cost",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate a Travel Plan for Location: {location}, for {travelDays} Days for {travelers} with a {budget} budget, Give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing each of the location for {travelDays} days with each day plan with best time span to travel the place, exact time taken to visit the place only in JSON format with key names in camel casing notation.";
