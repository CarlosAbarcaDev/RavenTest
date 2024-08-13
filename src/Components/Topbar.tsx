//assets
import { IoIosSearch } from "react-icons/io";
import { PiBellSimpleThin } from "react-icons/pi";
import Avatar from "../assets/Avatar.png";

const Topbar = () => {
  return (
    <div className="py-3 overflow-y-auto bg-neutral4 rounded-xl mt-9 flex">
      <div className="w-1/2 flex">
        <IoIosSearch className="text-neutral2 mx-2 text-2xl" />
        <p className="text-neutral2 mx-2 text-lg font-light">Search</p>
      </div>
      <div className="w-1/2 flex justify-end">
        <PiBellSimpleThin className="text-neutral2 mx-4 text-2xl" />
        <img src={Avatar} alt="avatar" className="mr-6 size-7" />
      </div>
    </div>
  );
};

export default Topbar;
