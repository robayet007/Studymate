import { BrowserRouter , Routes , Route } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";


function App(){
  return(
    <BrowserRouter>
      <div className="h-screen flex text-[#ffffff]">
      {/* sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <Sidebar/>
      </div>
      {/* sidebar */}

      {/* right side */}
      <div className="flex-1 flex  flex-col">
        <Topbar/>
        {/* pages */}

        <main className="bg-gray-800 h-screen pl-2">
          <Routes>
              <Route path="/"  element={<Dashboard/>}/>
              <Route path="/task"  element={<Task/>} />
          </Routes>
        </main>

      </div>
    </div>
    </BrowserRouter>
  )
}

export default App;
