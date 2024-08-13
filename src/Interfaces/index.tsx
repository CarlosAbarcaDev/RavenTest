// navbar interface
export interface ChildProps {
  navbarOptions: number;
  navbarToggle: (num: number) => void;
}

// task list interface
export interface AccordionProps {
  title: string;
}

//task interface
interface Creator {
  avatar: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  type: string;
  updatedAt: string;
}
interface Assignee {
  avatar: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  type: string;
  updatedAt: string;
}
export interface Task {
  id: string;
  name: string;
  status: string;
  dueDate: string;
  tags: [];
  creator: Creator
  assignee: Assignee
  createdAt: string;
  pointEstimate: string;
  position: string;
}
export interface TaskInterface {
  tasks: Task;
  title:string
}

export interface UsersInterface {
  avatar: string
  fullName:string
  id:string
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskEdit?: Task
}