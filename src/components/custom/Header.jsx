import { Button } from "../ui/button";
import logo from "../../assets/logo.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  //Login function
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const userDetails = await getUserDetail(response);
      localStorage.setItem("user", JSON.stringify(userDetails));
      setOpenDialog(false);
      navigate("/create-trip");
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

  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="flex items-center justify-between px-4 py-4 shadow-sm z-40 bg-white">
      <Link to={"/"}>
        <img src={logo} alt="Tripmaster.AI logo" />
      </Link>

      {user ? (
        <div className="flex items-center gap-5">
          <Link to={"/create-trip"}>
            <Button variant="outline" className="rounded-full">
              + Create Trips
            </Button>
          </Link>
          <Link to={"/my-trips"}>
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
          </Link>
          <Popover>
            <PopoverTrigger>
              <img
                src={user.picture}
                alt="Your profile picture"
                className="h-9 w-9 rounded-full"
              />
            </PopoverTrigger>
            <PopoverContent className="cursor-pointer" onClick={logout}>
              Logout
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger>
            <Button>Signup</Button>{" "}
          </DialogTrigger>
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
      )}
    </div>
  );
};

export default Header;
