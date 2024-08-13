import { FC } from "react";
import { useQuery } from "@apollo/client";

//assets

import "react-datepicker/dist/react-datepicker.css";

//interface
import { ModalProps } from "../../Interfaces";
import { PROFILE_INFORMATION } from "../../Utils/Querys";

const ModalSettings: FC<ModalProps> = ({ isOpen, onClose }) => {
  //data request
  const { data, error, loading } = useQuery(PROFILE_INFORMATION);

  console.log("user info", data);

  if (!isOpen) return null;
  
  if (loading) {
    return (
      <div className="flex w-full justify-center mt-10">
        <p className="text-neutral1 font bold"> Loading</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex w-full justify-center mt-10">
        <p className="text-neutral1 font bold"> An Error ocurred try again</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-neutral4 w-full mb-6 shadow-lg rounded-xl mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
                  className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-28">
            <h3 className="text-2xl text-neutral1 font-bold leading-normal mb-1">
              {data.profile.fullName}
            </h3>
            <div className=" mt-0 mb-2 text-neutral2">{data.profile.email}</div>
            <div className="text-xs mt-0 mb-2 text-neutral2 font-bold uppercase">
              {data.profile.type}
            </div>
          </div>
          <div className="w-full text-center mt-2">
            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
              <div className="p-3 text-center">
                <span className="text-sm text-neutral1">Started At</span>
                <span className="text-xl font-bold block uppercase tracking-wide text-neutral2">
                  {new Date(data.profile.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="p-3 text-center">
                <span className="text-sm text-neutral1">Last Update</span>
                <span className="text-xl font-bold block uppercase tracking-wide text-neutral2">
                {new Date(data.profile.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end my-4">
            <button
              type="submit"
              className="px-4 py-2 bg-primary2 text-white rounded hover:bg-primary4"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalSettings;
