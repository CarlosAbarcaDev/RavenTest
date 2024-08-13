import React, { FC, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
//assets
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { RiPriceTag3Fill } from "react-icons/ri";
import { VscServerProcess } from "react-icons/vsc";
import Avatar from "../../assets/Avatar.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
//request
import { USERS_LIST, ADD_TASK, TASK_LIST } from "../../Utils/Querys";
//interface
import { UsersInterface, Task,ModalProps } from "../../Interfaces";


const ModalCreate: FC<ModalProps> = ({ isOpen, onClose }) => {
  const [estimateOptions, setEstimateOptions] = useState<boolean>(false);
  const [assigneeOptions, setAssigneeOptions] = useState<boolean>(false);
  const [tagsOptions, setTagsOptions] = useState<boolean>(false);
  const [statusOptions, setStatusOptions] = useState<boolean>(false);
  const [statusSelected, setStatusSelected] = useState<string>("");
  const [estimateOptionSelected, setEstimateOptionSelected] = useState(0);
  const [assigneeSelected, setAssigneeSelected] = useState("");
  const [assigneeLabel, setAssigneeLabel] = useState<string>("");
  const [statusLabel, setStatusLabel] = useState<string>("");
  const [startDateSelected, setStartDateSelected] = useState<Date | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  //users request
  const { data } = useQuery(USERS_LIST);

  //checkbox format
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedItems((prevItems) => [...prevItems, value]);
    } else {
      setSelectedItems((prevItems) =>
        prevItems.filter((item) => item !== value)
      );
    }
  };

  //submit
  const { register, handleSubmit } = useForm<Task>();
  const [createTask] = useMutation(ADD_TASK, {
    refetchQueries: [
      {
        query: TASK_LIST,
      },
    ],
  });
  const onSubmit = async (values: Task) => {
    try {
      const { data } = await createTask({
        variables: {
          input: {
            assigneeId: `${assigneeSelected}`,
            //  assigneeId: assigneeSelected,
            dueDate: startDateSelected,
            name: values.name,
            pointEstimate:
              estimateOptionSelected === 0
                ? "ZERO"
                : estimateOptionSelected === 1
                ? "ONE"
                : estimateOptionSelected === 2
                ? "TWO"
                : estimateOptionSelected === 4
                ? "FOUR"
                : estimateOptionSelected === 8
                ? "EIGHT"
                : "ZERO",
            tags: selectedItems,
            status: statusSelected,
          },
        },
      });
      if (data) {
        Swal.fire({
          title: "Success",
          text: "Task created",
          icon: "success",
        }).then(() => {
          setEstimateOptionSelected(0)
          setStatusSelected('')
          setStatusLabel('')
          setAssigneeSelected('')
          setAssigneeLabel('')
          setSelectedItems([])
          onClose();
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
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-neutral4 rounded-lg shadow-lg w-11/12  p-4">
          <div className="flex justify-between items-center m-4">
            <input
              type="text"
              placeholder="Task Name"
              {...register("name")}
              className="bg-transparent border-none focus:ring-0 placeholder-gray-400 text-white text-xl outline-none w-full"
            />
          </div>
          <div className="flex p-3">
            <div
              className="w-1/5 flex relative cursor-pointer"
              onClick={() => setEstimateOptions(!estimateOptions)}
            >
              <div className="flex bg-neutral1/10 rounded py-1 px-4">
                <div className="bg-neutral1 text-neutral4 font-bold px-1">
                  + -
                </div>
                <div className="px-2">
                  <p className="text-neutral1 ">
                    {estimateOptionSelected === 0
                      ? "Estimate"
                      : estimateOptionSelected + " Points/s"}
                  </p>
                </div>
                <div
                  id="dropdown-menu"
                  className={` w-2/3 origin-top-left absolute left-0 mt-8  rounded-md shadow-lg bg-neutral3 ring-1 ring-black ring-opacity-5 ${
                    estimateOptions ? "" : "hidden"
                  }`}
                >
                  <div className="w-full flex justify-center mt-2">
                    <p className="text-neutral2 font-bold text-lg">Estimate</p>
                  </div>
                  <div
                    className="py-2 p-2 w-full"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdown-button"
                  >
                    <div
                      className=" px-4 py-2 mb-1 text-sm text-neutral1 cursor-pointer flex"
                      role="menuitem"
                      onClick={() => setEstimateOptionSelected(1)}
                    >
                      <div className="bg-neutral1 text-neutral4 font-bold px-1">
                        + -
                      </div>
                      <div className="px-1">
                        <p className="text-neutral1 ">1 Points</p>
                      </div>
                    </div>
                    <div
                      className=" px-4 py-2 mb-1 text-sm text-neutral1 cursor-pointer flex"
                      role="menuitem"
                      onClick={() => setEstimateOptionSelected(2)}
                    >
                      <div className="bg-neutral1 text-neutral4 font-bold px-1">
                        + -
                      </div>
                      <div className="px-1">
                        <p className="text-neutral1 ">2 Points</p>
                      </div>
                    </div>
                    <div
                      className=" px-4 py-2 mb-1 text-sm text-neutral1 cursor-pointer flex"
                      role="menuitem"
                      onClick={() => setEstimateOptionSelected(4)}
                    >
                      <div className="bg-neutral1 text-neutral4 font-bold px-1">
                        + -
                      </div>
                      <div className="px-1">
                        <p className="text-neutral1 ">4 Points</p>
                      </div>
                    </div>
                    <div
                      className=" px-4 py-2 mb-1 text-sm text-neutral1 cursor-pointer flex"
                      role="menuitem"
                      onClick={() => setEstimateOptionSelected(8)}
                    >
                      <div className="bg-neutral1 text-neutral4 font-bold px-1">
                        + -
                      </div>
                      <div className="px-1">
                        <p className="text-neutral1 ">8 Points</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/5 flex relative cursor-pointer"
              onClick={() => setStatusOptions(!statusOptions)}
            >
              <div className="flex bg-neutral1/10 rounded py-1 px-4">
              <div className="px-1 mt-1">
                  <VscServerProcess className="text-neutral1" />
                </div>
                <div className="px-2">
                  <p className="text-neutral1 ">
                    {statusLabel === ""
                      ? "Status"
                      : statusLabel }
                  </p>
                </div>
                <div
                  id="dropdown-menu"
                  className={`origin-top-left absolute left-0 mt-8 w-2/3 rounded-md shadow-lg bg-neutral3 ring-1 ring-black ring-opacity-5 ${
                    statusOptions ? "" : "hidden"
                  }`}
                >
                  
                  <div
                    className="py-2 p-2 w-full"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdown-button"
                  >
                    <div className="w-full flex justify-center mt-2">
                    <p className="text-neutral2 font-bold text-lg">
                      Status
                    </p>
                  </div>
                    <div
                      className=" px-4 py-2 mb-1 text-sm text-neutral1 cursor-pointer flex hover:bg-neutral2"
                      role="menuitem"
                      onClick={() => {setStatusSelected('TODO')
                        setStatusLabel('Working')
                      }}
                    >
                      
                      <div className="px-1">
                        <p className="text-neutral1 ">Working</p>
                      </div>
                    </div>
                    <div
                      className=" px-4 py-2 mb-1 text-sm text-neutral1 cursor-pointer flex hover:bg-neutral2"
                      role="menuitem"
                      onClick={() => {setStatusSelected("IN_PROGRESS")
                        setStatusLabel('In Progress')
                      }}
                    >
                      
                      <div className="px-1">
                        <p className="text-neutral1 ">In Progress</p>
                      </div>
                    </div>
                    <div
                      className=" px-4 py-2 mb-1 text-sm text-neutral1 hover:bg-neutral2 cursor-pointer flex"
                      role="menuitem"
                      onClick={() => {setStatusSelected('DONE')
                        setStatusLabel('Completed')
                      }}
                    >
                      
                      <div className="px-1">
                        <p className="text-neutral1 ">Completed</p>
                      </div>
                    </div>
                    <div
                      className=" px-4 py-2 mb-1 text-sm text-neutral1 hover:bg-neutral2 cursor-pointer flex"
                      role="menuitem"
                      onClick={() => {setStatusSelected("CANCELLED")
                        setStatusLabel('Cancelled')
                       }}
                    >
                      
                      <div className="px-1">
                        <p className="text-neutral1 ">Cancelled</p>
                      </div>
                    </div>
                    <div
                      className=" px-4 py-2 mb-1 text-sm text-neutral1 hover:bg-neutral2 cursor-pointer flex"
                      role="menuitem"
                      onClick={() => {setStatusSelected("BACKLOG")
                        setStatusLabel('Backlog')
                      }}
                    >
                     
                      <div className="px-1">
                        <p className="text-neutral1 ">Backlog</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/5 mx-2 flex relative cursor-pointer"
              onClick={() => setAssigneeOptions(!assigneeOptions)}
            >
              <div className="flex bg-neutral1/10 rounded py-1 px-4">
                <div className="px-1 mt-1">
                  <FaUser className="text-neutral1" />
                </div>
                <div className="px-2">
                  <p className="text-neutral1 ">
                    {assigneeLabel === "" ? "Assignee" : assigneeLabel}
                  </p>
                </div>
                <div
                  id="dropdown-menu"
                  className={`origin-top-right absolute right-0 mt-8 w-full rounded-md shadow-lg bg-neutral3 ring-1 ring-black ring-opacity-5 ${
                    assigneeOptions ? "" : "hidden"
                  }`}
                >
                  <div className="w-full flex justify-center mt-2">
                    <p className="text-neutral2 font-bold text-lg">
                      Assignee To...
                    </p>
                  </div>
                  <div
                    className="py-2 p-2 w-full"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdown-button"
                  >
                    {data?.users.map((element: UsersInterface) => {
                      return (
                        <div
                          className=" px-4 py-2 mb-1 text-sm text-neutral1 cursor-pointer flex hover:bg-neutral2 hover:rounded"
                          role="menuitem"
                          onClick={() => {
                            setAssigneeLabel(
                              element.fullName.split(" ").slice(0, 2).join(" ")
                            );
                            setAssigneeSelected(element.id);
                          }}
                        >
                          <div>
                            <img
                              src={Avatar}
                              alt="avatar"
                              className="mr-6 size-7"
                            />
                          </div>
                          <div className="px-1">
                            <p className="text-neutral1 ">{element.fullName}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/5 mx-2 flex relative">
              <div className="flex bg-neutral1/10 rounded py-1 px-4">
                <div className="px-1 mt-1 cursor-pointer">
                  <RiPriceTag3Fill
                    className="text-neutral1"
                    onClick={() => setTagsOptions(!tagsOptions)}
                  />
                </div>
                <div className="px-2">
                  <p className="text-neutral1 ">
                    {selectedItems.length === 0
                      ? "Label"
                      : selectedItems.length + " Tag/s"}
                  </p>
                </div>
                <div
                  id="dropdown-menu"
                  className={`origin-top-right absolute right-0 mt-8 w-full rounded-md shadow-lg bg-neutral3 ring-1 ring-black ring-opacity-5 ${
                    tagsOptions ? "" : "hidden"
                  }`}
                >
                  <div className="w-full flex justify-center mt-2">
                    <p className="text-neutral2 font-bold text-lg">
                      Tag Tittle
                    </p>
                  </div>
                  <div
                    className="py-2 p-2 w-full"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdown-button"
                  >
                    <div
                      className=" px-4 py-2 mb-1 text-sm text-neutral1  flex flex-col"
                      role="menuitem"
                    >
                      <div className="w-full flex flex-1 mb-2">
                        <div>
                          <input
                            type="checkbox"
                            value={"ANDROID"}
                            onChange={handleCheckboxChange}
                            className="rounded mr-2"
                          />
                        </div>
                        <div className="px-1">
                          <p className="text-neutral1 ">Android</p>
                        </div>
                      </div>
                      <div className="w-full flex flex-1 mb-2">
                        <div>
                          <input
                            type="checkbox"
                            value={"IOS"}
                            onChange={handleCheckboxChange}
                            //   checked={selectedItems.includes('android')} editar
                            className="rounded mr-2"
                          />
                        </div>
                        <div className="px-1">
                          <p className="text-neutral1 ">IOS</p>
                        </div>
                      </div>
                      <div className="w-full flex flex-1 mb-2">
                        <div>
                          <input
                            type="checkbox"
                            value={"NODE_JS"}
                            onChange={handleCheckboxChange}
                            className="rounded mr-2"
                          />
                        </div>
                        <div className="px-1">
                          <p className="text-neutral1 ">Node JS</p>
                        </div>
                      </div>
                      <div className="w-full flex flex-1 mb-2">
                        <div>
                          <input
                            type="checkbox"
                            value={"RAILS"}
                            onChange={handleCheckboxChange}
                            className="rounded mr-2"
                          />
                        </div>
                        <div className="px-1">
                          <p className="text-neutral1 ">Rails</p>
                        </div>
                      </div>
                      <div className="w-full flex flex-1 mb-2">
                        <div>
                          <input
                            type="checkbox"
                            value={"REACT"}
                            onChange={handleCheckboxChange}
                            className="rounded mr-2"
                          />
                        </div>
                        <div className="px-1">
                          <p className="text-neutral1 ">React</p>
                        </div>
                      </div>
                      <div className="w-full flex flex-1 justify-end mb-2">
                        <button type="button" className="px-4 py-2 bg-primary2 text-white rounded hover:bg-primary4" onClick={() =>setTagsOptions(!tagsOptions)}>
                            close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/5 mx-2 flex relative cursor-pointer">
              <div className="flex bg-neutral1/10 rounded py-1 px-4">
                <div className="px-1 mt-1">
                  <FaCalendarAlt className="text-neutral1 mr-2" />
                </div>
                <DatePicker
                  selected={startDateSelected}
                  onChange={(date: Date | null) => {
                    setStartDateSelected(date);
                  }}
                  className="bg-white border border-gray-300 rounded-lg px-4  focus:border-transparent"
                  dateFormat="dd/MM/yyyy"
                  id="date-picker"
                  placeholderText="Due Date"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 mx-3  text-white rounded hover:bg-neutral2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary2 text-white rounded hover:bg-primary4"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ModalCreate;
