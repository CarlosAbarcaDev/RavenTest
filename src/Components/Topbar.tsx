//assets
import { IoIosSearch } from "react-icons/io";
import { PiBellSimpleThin } from "react-icons/pi";
import { AiOutlineSetting } from "react-icons/ai";
import Avatar from "../assets/Avatar.png";
import { useState } from "react";
import ModalSettings from "./Modals/ModalSettings";

const Topbar = () => {
  
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //toggle menu
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
    //modal interaction
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  return (
    <div className="py-3 overflow-y-auto bg-neutral4 rounded-xl mt-9 flex">
      <div className="w-1/2 flex">
        <IoIosSearch className="text-neutral2 mx-2 text-2xl" />
        <p className="text-neutral2 mx-2 text-lg font-light">Search</p>
      </div>
      <div className="w-1/2 flex justify-end relative">
        <PiBellSimpleThin className="text-neutral2 mx-4 text-2xl" />
        <img src={Avatar} alt="avatar" className="mr-6 size-7 cursor-pointer" onClick={toggleMenu}/>
      </div>
      <div className=" flex justify-between">
       
        <div
          id="dropdown-menu"
          className={`origin-top-right absolute right-0 mx-12 mt-8 w-1/8 rounded-md shadow-lg bg-neutral3 ring-1 ring-black ring-opacity-5 ${
            isMenuVisible ? "" : "hidden"
          }`}
        >
          <div
            className="py-2 p-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >
            <div
              className=" px-4 py-2 mb-1 text-sm text-neutral1 cursor-pointer flex"
              role="menuitem"
              onClick={() => {
                openModal()
                toggleMenu();
              }}
            >
              <AiOutlineSetting  className="mr-3 text-xl" />
              Settings
            </div>

          </div>
        </div>
      </div>
      <ModalSettings isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Topbar;
