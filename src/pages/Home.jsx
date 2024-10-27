import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col items-center mx-4 md:mx-16 lg:mx-56 my-6 md:my-12  gap-9 text-center">
        <h1 className="text-3xl md:text-[50px] font-extrabold mt-16 leading-normal">
          <span className="text-[#f56551] min-w-full">
            Discover Your Next Adventure with AI:
          </span>
          <br />
          Personalised Itineraries at Your Fingertips
        </h1>
        <p className="text-md md:text-xl text-gray-500 ">
          Your personal trip planner and travel curator, creating custom
          itinearies tailored to your interests and budget
        </p>
        <Link to={"/create-trip"}>
          <Button>Get Started, It&apos;s free</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
