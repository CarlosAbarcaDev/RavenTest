//assets
import WhiteLogo from "../assets/WhiteLogo.png";
import { RiFunctionLine } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";

//interfaces
import { ChildProps } from "../Interfaces";

const Navbar: React.FC<ChildProps> = ({ navbarToggle, navbarOptions }) => {
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-[836px] transition-transform -translate-x-full sm:translate-x-0 mt-10 ml-10"
        aria-label="Sidebar"
      >
        <div className="h-full py-4 overflow-y-auto bg-neutral4 rounded-3xl">
          <div className="flex justify-center mt-1 mb-10">
            <img src={WhiteLogo} alt="white-logo" className="h-10" />
          </div>
          <ul className="space-y-2 ml-4">
            <li
              className={
                navbarOptions === 0
                  ? "bg-gradient-to-l from-primary4/20 from-1% cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={() => navbarToggle(0)}
            >
              <div className="flex items-center p-4 text-gray-900 rounded-lg group">
                <RiFunctionLine
                  className={
                    navbarOptions === 0
                      ? "text-lg text-primary4"
                      : "text-lg text-neutral2"
                  }
                />
                <p
                  className={
                    navbarOptions === 0
                      ? "flex-1 ms-3 whitespace-nowrap ml-6 font-semibold text-lg text-primary4"
                      : "flex-1 ms-3 whitespace-nowrap ml-6 font-semibold text-lg text-neutral2"
                  }
                >
                  DASHBOARD
                </p>
              </div>
            </li>
            <li
              className={
                navbarOptions === 1
                  ? "bg-gradient-to-l from-primary4/20 from-1% cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={() => navbarToggle(1)}
            >
              <div className="flex items-center p-4 text-gray-900 rounded-lg group">
                <AiOutlineMenu className={
                    navbarOptions === 1
                      ? "text-lg text-primary4"
                      : "text-lg text-neutral2"
                  } />
                <p  className={
                    navbarOptions === 1
                      ? "flex-1 ms-3 whitespace-nowrap ml-6 font-semibold text-lg text-primary4"
                      : "flex-1 ms-3 whitespace-nowrap ml-6 font-semibold text-lg text-neutral2"
                  }>
                  MY TASK
                </p>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
