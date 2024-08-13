import { useState, FC, useEffect } from "react";
import { Task, TaskInterface } from "../Interfaces";
//assets
import { FaRegComment } from "react-icons/fa";
import { RiOrganizationChart, RiDeleteBinLine } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import Avatar from "../assets/Avatar.png";
import ModalEdit from "./Modals/ModalEdit";
import { useMutation } from "@apollo/client";
import { DELETE_TASK, TASK_LIST } from "../Utils/Querys";
import Swal from 'sweetalert2'
const TaskList: FC<TaskInterface> = ({ tasks }) => {
  const [dateLabel, setDateLabel] = useState<string>("");
  const [estimateLabel, setEstimateLabel] = useState<number>(0);
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
    formatPoint();
  }, [tasks]);

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
    <>
      <div
        dir="ltr"
        className="w-full flex border-y border-neutral2 bg-neutral4 divide-x divide-neutral3"
      >
        <div className={`w-4/12 p-4 flex justify-between border-s-4  ${dateLabel === "YESTERDAY" ? "border-primary4" : "text-neutral1"}`}>
          <p className="text-neutral1 ml-8">{tasks.name}</p>
          <div className="flex">
            <div className="flex">
              <p className="text-neutral1 mt-1">5</p>
              <RiOrganizationChart className="mt-2 text-neutral1 text-lg" />
            </div>
            <div className="flex">
              <p className="text-neutral1  mx-1 mt-1 ">3</p>
              <FaRegComment className="mt-2 text-neutral1 text-lg" />
            </div>
          </div>
        </div>
        <div className="w-2/12 p-6 grid grid-cols-1 gap-4">
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
        <div className="w-2/12 p-4">
          <p className="text-neutral1"> {estimateLabel} points</p>
        </div>
        <div className="w-2/12 p-4 flex">
          <div>
            <img src={Avatar} alt="avatar" className="mr-6 size-7" />
          </div>
          <div className="w-full">
            <p className="text-neutral1 font-bold">{tasks.assignee.fullName}</p>
            <p className="text-neutral1 font-light">{tasks.assignee.type}</p>
          </div>
        </div>
        <div className="w-2/12 p-4 flex justify-between">
          <p
            className={` mt-1 ${
              dateLabel === "YESTERDAY" ? "text-red-600" : "text-neutral1"
            }`}
          >
            {dateLabel}
          </p>
          <HiOutlineDotsHorizontal
          className="text-neutral2 text-3xl mx-2 cursor-pointer "
          id="dropdown-button"
          onClick={toggleMenu}
        />
         <div
          id="dropdown-menu"
          className={`origin-top-right absolute right-0 mt-8 w-1/12 rounded-md shadow-lg bg-neutral3 ring-1 ring-black ring-opacity-5 ${
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
      </div>
      <ModalEdit isOpen={isModalOpen} onClose={closeModal} taskEdit={tasks} />
    </>
  );
};

export default TaskList;
