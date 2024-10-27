import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { chatSession } from "@/services/AIModel";
import {
  AI_PROMPT,
  selectBudgetOptions,
  selectTravelersList,
} from "@/travelOptions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import logo from "../assets/logo.svg";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateFormData = (formData) => {
    if (
      !formData.location ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.travelers
    ) {
      toast.warning("Please fill all the details correctly 🙃", {
        style: { fontSize: "15px" },
      });
      return;
    }

    if (formData?.noOfDays < 0) {
      toast.error("Trip duration should be greater than 0 🙁", {
        style: { fontSize: "15px", color: "red" },
      });
      return;
    }

    if (formData?.noOfDays > 5) {
      toast.error("Trip duration should be less than 5 days 🙁", {
        style: { fontSize: "15px", color: "red" },
      });
      return;
    }
  };

  //Login function
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response);
      const userDetails = await getUserDetail(response);
      localStorage.setItem("user", JSON.stringify(userDetails));
      setOpenDialog(false);
      console.log(userDetails);
    },
    onError: (error) => console.log(error),
  });

  //Getting user details through access token
  const getUserDetail = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "Application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return new Error(error);
    }
  };

  //Store data to firebase database
  const saveTripData = async (tripData) => {
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    await setDoc(doc(db, "AllTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user.email,
      id: docId,
    });
    navigate(`/trips/${docId}`);
  };

  //Trip generation Handler
  const onGenerateTrip = async () => {
    setLoading(true);
    //Data Validations
    validateFormData(formData);

    //Generating final AI prompt
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData.location.label
    )
      .replaceAll("{travelDays}", formData.noOfDays)
      .replaceAll("{travelers}", formData.travelers)
      .replaceAll("{budget}", formData.budget);

    // console.log(FINAL_PROMPT);
    //Getting response from AI model
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      saveTripData(result.response.text());
      // console.log(result.response.text());
      setLoading(false);
    } catch (error) {
      {
        toast.warning("Something went wrong! Please try again.", {
          style: { color: "tomato", fontSize: "16px" },
        });
      }
      setLoading(false);
      console.log(
        "API Error: " + error.response ? error.response?.data : error
      );
    }
  };

  //Credential Validator
  const handleGenerateTrip = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
    }
    onGenerateTrip();
  };

  return (
    <div>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        {/* Heading Text */}
        <h2 className="font-bold text-2xl md:text-3xl">
          Tell us your travel preferences 🏕️🌴
        </h2>
        <p className="mt-3 text-gray-500 text-base md:text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itenary based on your preferences.
        </p>

        {/* Adding the Form fields */}
        <div className="mt-12 md:mt-20 flex flex-col gap-10">
          {/* Adding the google place autocomplete */}
          <div>
            <h2 className="text-lg md:text-xl my-1 md:my-3 font-medium">
              What is your destination of choice?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (value) => {
                  setPlace(value);
                  handleInputChange("location", value);
                },
              }}
            />
          </div>

          {/* Adding the no of days input box */}
          <div>
            <h2 className="text-lg md:text-xl my-1 md:my-3 font-medium">
              How many days are you planning?
            </h2>
            <Input
              placeholder={"Ex. 3"}
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>

          {/* Adding the Budget options */}
          <div>
            <h2 className="text-lg md:text-xl my-1 md:my-3 font-medium">
              What is your budget?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5 ">
              {selectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-md bg-white cursor-pointer ${
                    formData?.budget == item.title &&
                    "hover:shadow-lg shadow-lg border-2 border-gray-400"
                  }`}
                  onClick={() => handleInputChange("budget", item.title)}
                >
                  <h2 className="text-xl md:text-4xl">{item.icon}</h2>
                  <h2 className="text-md md:text-lg font-bold">{item.title}</h2>
                  <h2 className="text-xs md:text-sm text-gray-500 ">
                    {item.description}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          {/* Adding the no of travelers options */}
          <div>
            <h2 className="text-lg md:text-xl my-1 md:my-3 font-medium">
              Who do you want to travel with on your next adventure?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5 ">
              {selectTravelersList.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-md bg-white cursor-pointer ${
                    formData?.travelers == item.people &&
                    "hover:shadow-lg shadow-lg border-2 border-gray-400"
                  }`}
                  onClick={() => handleInputChange("travelers", item.people)}
                >
                  <h2 className="text-xl md:text-4xl">{item.icon}</h2>
                  <h2 className="text-md md:text-lg font-bold">{item.title}</h2>
                  <h2 className="text-xs md:text-sm text-gray-500 ">
                    {item.description}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            {loading ? (
              <Button>
                <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" />
              </Button>
            ) : (
              <Button disabled={loading} onClick={handleGenerateTrip}>
                Generate Trip
              </Button>
            )}
          </div>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <img src={logo} alt="TripMaster Logo" />
                </DialogTitle>
                <DialogDescription>
                  <h2 className="font-bold text-lg">Signin With Google</h2>
                  <p className="text-md text-gray-400">
                    Signin to the app with google authentication securely
                  </p>
                  <Button
                    onClick={login}
                    className="w-full mt-4 flex gap-4 items-center"
                  >
                    <FcGoogle className="h-7 w-7" />
                    Signin with Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
