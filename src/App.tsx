import { useState } from "react";
//components
import Navbar from "./Components/Navbar";
import Dashboard from "./Views/Dashboard";
import MyTasks from "./Views/MyTasks";

function App() {
  const [navbarOptions, setNavbarOptions] = useState<number>(0);

  //view selection
  const navbarToggle = (option: number) => {
    setNavbarOptions(option);
  };

  return (
    <>
      <Navbar navbarToggle={navbarToggle} navbarOptions={navbarOptions} />

      <div className="pl-20">
        {navbarOptions === 0 ? <Dashboard /> : <MyTasks />}
      </div>
    </>
  );
}

export default App;
