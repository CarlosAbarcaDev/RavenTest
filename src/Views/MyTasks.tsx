import { useState } from "react";
import { useQuery } from "@apollo/client";
//components
import TopBar from "../Components/Topbar";
import Card from "../Components/Card";
import TaskList from "../Components/TaskList";
//assets
import { RiFunctionLine } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
//request
import { TASK_LIST } from "../Utils/Querys";
//interface
import { Task } from "../Interfaces";
import ModalCreate from "../Components/Modals/ModalCreate";

const MyTasks = () => {
  const [optionToggle, setOptionToggle] = useState<number>(0);
  const [isOpenWorking, setIsOpenWorking] = useState(true);
  const [isOpenProgress, setIsOpenProgress] = useState(false);
  const [isOpenCompleted, setIsOpenCompleted] = useState(false);
  const [isOpenCancelled, setIsOpenCancelled] = useState(false);
  const [isOpenBacklog, setIsOpenBacklog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, error, loading } = useQuery(TASK_LIST);
  //modal interaction
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    <>
      <div className="p-1 sm:ml-64 mx-4">
        <TopBar />

        <div className="w-full flex mt-6">
          <div className="w-1/2 flex">
            <div
              className={
                optionToggle === 1
                  ? "border border-primary4 rounded-lg p-2 cursor-pointer"
                  : "p-2 cursor-pointer"
              }
              onClick={() => setOptionToggle(1)}
            >
              <AiOutlineMenu
                size={21}
                className={
                  optionToggle === 1 ? "text-primary4" : "text-neutral2"
                }
              />
            </div>
            <div
              className={
                optionToggle === 0
                  ? "border border-primary4 rounded-lg p-2 cursor-pointer"
                  : "p-2 cursor-pointer"
              }
              onClick={() => setOptionToggle(0)}
            >
              <RiFunctionLine
                size={22}
                className={
                  optionToggle === 0 ? "text-primary4" : "text-neutral2"
                }
              />
            </div>
          </div>
          <div className="w-1/2 flex justify-end mx-10">
            <FaPlusSquare
              size={38}
              className="text-primary4 mt-1 cursor-pointer"
              onClick={() => openModal()}
            />
          </div>
        </div>
        {optionToggle === 0 ? (
          <div className="w-full flex mt-10 p-4 ">
            <div className="w-1/5 ">
              <p className="text-neutral1 font-semibold text-lg">Working</p>
              {data?.tasks.map((element: Task) => {
                if (element.status === "TODO") {
                  return <Card tasks={element} key={element.id} title="" />;
                }
                return null;
              })}
            </div>
            <div className="w-1/5 ">
              <p className="text-neutral1 font-semibold text-lg">In Progress</p>
              {data?.tasks.map((element: Task) => {
                if (element.status === "IN_PROGRESS") {
                  return <Card tasks={element} key={element.id} title="" />;
                }
                return null;
              })}
            </div>
            <div className="w-1/5">
              <p className="text-neutral1 font-semibold text-lg">Completed</p>
              {data?.tasks.map((element: Task) => {
                if (element.status === "DONE") {
                  return <Card tasks={element} key={element.id} title="" />;
                }
                return null;
              })}
            </div>
            <div className="w-1/5 ">
              <p className="text-neutral1 font-semibold text-lg">Cancelled</p>
              {data?.tasks.map((element: Task) => {
                if (element.status === "CANCELLED") {
                  return <Card tasks={element} key={element.id} title="" />;
                }
                return null;
              })}
            </div>
            <div className="w-1/5 ">
              <p className="text-neutral1 font-semibold text-lg">Backlog</p>
              {data?.tasks.map((element: Task) => {
                if (element.status === "BACKLOG") {
                  return <Card tasks={element} key={element.id} title="" />;
                }
                return null;
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="w-full flex mt-8 rounded-lg bg-neutral4 divide-x divide-neutral3">
              <div className="w-4/12 p-4">
                <p className="text-neutral1"># Task Name</p>
              </div>
              <div className="w-2/12 p-4">
                <p className="text-neutral1">Task Tags</p>
              </div>
              <div className="w-2/12 p-4">
                <p className="text-neutral1">Estimate</p>
              </div>
              <div className="w-2/12 p-4">
                <p className="text-neutral1">Task Assign Name</p>
              </div>
              <div className="w-2/12 p-4">
                <p className="text-neutral1">Due Date</p>
              </div>
            </div>
            <div className="w-full">
              <div className="mt-10 bg-neutral4 p-1 rounded-t-lg">
                <button
                  className="w-full text-left px-4 py-2 focus:outline-none "
                  onClick={() => {
                    setIsOpenWorking(!isOpenWorking);
                  }}
                >
                  <div className="flex items-center">
                    <span
                      className={`transform transition-transform ${
                        isOpenWorking ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                    <p className=" text-neutral1 mx-3">Working</p>
                  </div>
                </button>
              </div>
              {isOpenWorking ? (
                <>
                  {data?.tasks.map((element: Task) => {
                    if (element.status === "TODO") {
                      return (
                        <TaskList
                          title="In Progress"
                          tasks={element}
                          key={element.id}
                        />
                      );
                    }
                    return null;
                  })}
                </>
              ) : null}
            </div>
            <div className="w-full">
              <div className="mt-10 bg-neutral4 p-1 rounded-t-lg">
                <button
                  className="w-full text-left px-4 py-2 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
                  onClick={() => {
                    setIsOpenProgress(!isOpenProgress);
                  }}
                >
                  <div className="flex items-center">
                    <span
                      className={`transform transition-transform ${
                        isOpenProgress ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                    <p className=" text-neutral1 mx-3">In Progress</p>
                  </div>
                </button>
              </div>
              {isOpenProgress ? (
                <>
                  {data?.tasks.map((element: Task) => {
                    if (element.status === "IN_PROGRESS") {
                      return (
                        <TaskList
                          title="In Progress"
                          tasks={element}
                          key={element.id}
                        />
                      );
                    }
                    return null;
                  })}
                </>
              ) : null}
            </div>
            <div className="w-full">
              <div className="mt-10 bg-neutral4 p-1 rounded-t-lg">
                <button
                  className="w-full text-left px-4 py-2 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
                  onClick={() => {
                    setIsOpenCompleted(!isOpenCompleted);
                  }}
                >
                  <div className="flex items-center">
                    <span
                      className={`transform transition-transform ${
                        isOpenCompleted ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                    <p className=" text-neutral1 mx-3">Completed</p>
                  </div>
                </button>
              </div>
              {isOpenCompleted ? (
                <>
                  {data?.tasks.map((element: Task) => {
                    if (element.status === "DONE") {
                      return (
                        <TaskList
                          title="In Progress"
                          tasks={element}
                          key={element.id}
                        />
                      );
                    }
                    return null;
                  })}
                </>
              ) : null}
            </div>
            <div className="w-full">
              <div className="mt-10 bg-neutral4 p-1 rounded-t-lg">
                <button
                  className="w-full text-left px-4 py-2 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
                  onClick={() => {
                    setIsOpenCancelled(!isOpenCancelled);
                  }}
                >
                  <div className="flex items-center">
                    <span
                      className={`transform transition-transform ${
                        isOpenCancelled ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                    <p className=" text-neutral1 mx-3">Cancelled</p>
                  </div>
                </button>
              </div>
              {isOpenCancelled ? (
                <>
                  {data?.tasks.map((element: Task) => {
                    if (element.status === "CANCELLED") {
                      return (
                        <TaskList
                          title="cancelled"
                          tasks={element}
                          key={element.id}
                        />
                      );
                    }
                    return null;
                  })}
                </>
              ) : null}
            </div>
            <div className="mt-10 bg-neutral4 p-1 rounded-t-lg">
              <button
                className="w-full text-left px-4 py-2 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
                onClick={() => {
                  setIsOpenBacklog(!isOpenBacklog);
                }}
              >
                <div className="flex items-center">
                  <span
                    className={`transform transition-transform ${
                      isOpenBacklog ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                  <p className=" text-neutral1 mx-3">Backlog</p>
                </div>
              </button>
            </div>
            {isOpenBacklog ? (
              <>
                {data?.tasks.map((element: Task) => {
                  if (element.status === "BACKLOG") {
                    return (
                      <TaskList
                        title="backlog"
                        tasks={element}
                        key={element.id}
                      />
                    );
                  }
                  return null;
                })}
              </>
            ) : null}
          </>
        )}
      </div>
      <ModalCreate isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default MyTasks;
