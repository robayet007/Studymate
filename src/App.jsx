import { BrowserRouter , Routes , Route } from "react-router-dom";
import { useState , useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";


function App(){

   const [sidebarOpen , setSidebarOpen] = useState(true)

   useEffect(()=>{
      const handleResize = () => {
        if(window.innerWidth <=1000){
          setSidebarOpen(false)
        }else{
          setSidebarOpen(true)
        }
      }

      handleResize()
      window.addEventListener("resize" , handleResize)

      return () => {
        window.removeEventListener("resize" , handleResize)
      }
   },[])

  return(
    <BrowserRouter>
      <div className="h-screen relative flex text-[#ffffff]">
      {/* sidebar */}
      <div className={` ${sidebarOpen ? "w-64" : "w-0"} 
      shrink-0 
      overflow-hidden 
      transition-all 
      duration-300 ease-in-out 
      bg-gray-800 border-r
      border-gray-700
      max-[1000px]:absolute
      z-10
       `}>
        <Sidebar/>
      </div>


      {/* right side */}
      <div className="flex-1 flex  flex-col">
        <Topbar sidebarOpen={sidebarOpen}  setSidebarOpen={setSidebarOpen}/>
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
