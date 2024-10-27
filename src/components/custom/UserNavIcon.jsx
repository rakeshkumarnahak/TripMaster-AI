import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiLogout } from "react-icons/ci";

const UserNavIcon = ({ userPicture, logout }) => {
  return (
    <div>
      <div className="hidden md:flex items-center gap-5">
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
              src={userPicture}
              alt="Your profile picture"
              className="h-9 w-9 rounded-full"
            />
          </PopoverTrigger>
          <PopoverContent className="cursor-pointer" onClick={logout}>
            Logout
          </PopoverContent>
        </Popover>
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src={userPicture}
              alt="Your profile picture"
              className="h-9 w-9 rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Link to={"/create-trip"}>
                <Button variant="outline" className="rounded-full text-xs">
                  + Create Trips
                </Button>
              </Link>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem></DropdownMenuItem> */}
            <DropdownMenuItem>
              <Link to={"/my-trips"}>
                <Button variant="outline" className="rounded-full text-xs">
                  My Trips
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer pr-6" onClick={logout}>
              <CiLogout />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserNavIcon;
