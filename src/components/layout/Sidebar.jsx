import {
  LayoutDashboard,
  ClipboardList,
  GraduationCap,
  Timer,
} from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
const listItem = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Task",
    path: "/task",
    icon: ClipboardList,
  },
  {
    name: "Pomodoro",
    path: "/pomodoro",
    icon: Timer,
  },
];
function Sidebar() {
  return (
    <div>
      <aside className="flex flex-col  h-screen">
        {/* logo */}
        <Link
          to="/"
          className="flex cursor-pointer gap-1 mt-2 p-1 border-b border-purple-600  text-purple-600 text-3xl font-bold"
        >
          <GraduationCap size={40} />
          <h1>StudyHack</h1>
        </Link>

        {/* menu list */}
        <ul className="mt-4 px-4">
          {listItem.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col rounded-full mt-1 text-[#B1B6BA] font-light ${isActive ? "bg-[#5B41D5] text-white" : "text-gray-600"} hover:bg-[#5B41D5] hover:text-white`
                }
              >
                <div className="flex  gap-2 px-6 py-2">
                  <Icon />
                  {item.name}
                </div>
              </NavLink>
            );
          })}
        </ul>

        {/* profile */}
      </aside>
    </div>
  );
}

export default Sidebar;
