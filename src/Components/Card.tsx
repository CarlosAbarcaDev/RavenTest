import { FC, useEffect, useState } from "react";
import ModalEdit from "./Modals/ModalEdit";
//assets
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdAlarm } from "react-icons/io";
import { TbPaperclip } from "react-icons/tb";
import { FaRegComment } from "react-icons/fa";
import { RiOrganizationChart, RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import Avatar from "../assets/Avatar.png";
import Swal from 'sweetalert2'
//interface
import { TaskInterface, Task } from "../Interfaces";
import { DELETE_TASK, TASK_LIST } from "../Utils/Querys";
import { useMutation } from "@apollo/client";

const Card: FC<TaskInterface> = ({ tasks }) => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [dateLabel, setDateLabel] = useState<string>("");
  const [estimateLabel, setEstimateLabel] = useState<number>(0);
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

  //date format
  const formatDate = () => {
    const dateISO = tasks.dueDate;

    const dateformat = new Date(dateISO);

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const soloFecha = (dateformat: Date) =>
      new Date(
        dateformat.getFullYear(),
        dateformat.getMonth(),
        dateformat.getDate()
      );

    let dateFormated;
    if (soloFecha(dateformat).getTime() === soloFecha(today).getTime()) {
      dateFormated = "TODAY";
    } else if (
      soloFecha(dateformat).getTime() === soloFecha(yesterday).getTime()
    ) {
      dateFormated = "YESTERDAY";
    } else {
      const day = dateformat.getUTCDate();
      const year = dateformat.getUTCFullYear();

      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];

      const month = months[dateformat.getUTCMonth()];

      dateFormated = `${day} ${month}, ${year}`;
    }

    setDateLabel(dateFormated);
  };
    //point format
    const formatPoint = () => {
      if (tasks.pointEstimate === "ZERO") {
        setEstimateLabel(0);
      } else if (tasks.pointEstimate === "ONE") {
        setEstimateLabel(1);
      } else if (tasks.pointEstimate === "TWO") {
        setEstimateLabel(2);
      } else if (tasks.pointEstimate === "FOUR") {
        setEstimateLabel(4);
      } else if (tasks.pointEstimate === "EIGHT") {
        setEstimateLabel(8);
      }
    };
  useEffect(() => {
    formatDate();
    formatPoint()
  });

  //delete function
  const [delTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: TASK_LIST,
      },
    ],
  });
  const deleteTask = async (task: Task) =>{
    
    Swal.fire({
      title: "Are you sure?",
      text: `This action will delete ${task.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DA584B",
      cancelButtonColor: "#94979A",
      confirmButtonText: "Yes, delete it!", 
    }).then( async (result) => {
      if (result.isConfirmed) {
        toggleMenu()
        try {
          const { data } = await delTask({
            variables: {
              input: {
                id: task.id
              },
            },
          });
          if (data) {
            Swal.fire({
              title: "Success",
              text: "Task Deleted",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while creating the task.",
            icon: "error",
          });
        }
       
      }
    });
  }

  return (
    <div className="w-11/12 bg-neutral4 rounded-xl py-5 px-3 mt-5">
      <div className="w-full flex justify-between relative">
        <p className="text-neutral1 text-lg">{tasks.name}</p>
        <HiOutlineDotsHorizontal
          className="text-neutral2 text-3xl mx-2 cursor-pointer "
          id="dropdown-button"
          onClick={toggleMenu}
        />
        <div
          id="dropdown-menu"
          className={`origin-top-right absolute right-0 mt-8 w-3/6 rounded-md shadow-lg bg-neutral3 ring-1 ring-black ring-opacity-5 ${
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
              onClick={() => {openModal()
                toggleMenu()
              }}
            >
              <MdOutlineEdit className="mr-1 text-lg" />
              Edit
            </div>
            <div
              className=" px-4 py-2 mb-1 text-sm text-neutral1 cursor-pointer flex"
              role="menuitem"
              onClick={() => deleteTask(tasks)}
            >
              <RiDeleteBinLine className="mr-1 text-lg" />
              Delete
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between mt-5">
        <p className="text-neutral1 text-lg">{estimateLabel} Points</p>
        <div
          className={`py-1 px-4 rounded  flex mx-2 ${
            dateLabel === "YESTERDAY" ? "bg-red-600/10" : "bg-neutral3"
          }`}
        >
          <IoMdAlarm
            className={`text-lg mr-2 mt-1 ${
              dateLabel === "YESTERDAY" ? "text-red-600" : "text-neutral1"
            }`}
          />
          <span
            className={`text-sm mt-1 ${
              dateLabel === "YESTERDAY" ? "text-red-600" : "text-neutral1"
            }`}
          >
            {dateLabel}
          </span>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-4 mt-5">
        {tasks.tags.map((element: string) => {
          return (
            <div
              className={`py-1 px-4 rounded ${
                element === "ANDROID"
                  ? "bg-secondary4/10"
                  : element === "IOS"
                  ? "bg-tertiary4/10"
                  : element === "REACT"
                  ? "bg-blue-600/10"
                  : element === "RAILS"
                  ? "bg-red-600/10"
                  : "bg-neutral1/10"
              }  flex justify-center`}
            >
              <p
                className={
                  element === "ANDROID"
                    ? "text-secondary4"
                    : element === "IOS"
                    ? "text-tertiary4"
                    : element === "REACT"
                    ? "text-blue-600"
                    : element === "RAILS"
                    ? "text-red-600"
                    : "text-neutral1"
                }
              >
                {element}
              </p>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-between mt-5">
        <div>
          <img src={Avatar} alt="avatar" className="mr-6 size-7" />
        </div>
        <div className="flex">
          <TbPaperclip className="mt-2 mx-1 text-neutral1 text-lg" />
          <div className="flex mx-1">
            <p className="text-neutral1 mt-1 ">5</p>
            <RiOrganizationChart className="mt-2 text-neutral1 text-lg" />
          </div>
          <div className="flex mx-1">
            <p className="text-neutral1 mt-1 ">3</p>
            <FaRegComment className="mt-2 text-neutral1 text-lg" />
          </div>
        </div>
      </div>
      <ModalEdit isOpen={isModalOpen} onClose={closeModal} taskEdit={tasks} />
    </div>
  );
};

export default Card;
