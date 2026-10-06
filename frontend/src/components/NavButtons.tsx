import { cn } from "../lib/utils";
import { NavLink } from "react-router-dom";

export function NavButtons() {
  const linkClasses =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer";
  const activeClasses = "bg-indigo-600 text-white shadow-xs";
  const inactiveClasses = "text-gray-600 hover:text-gray-900 hover:bg-gray-100";

  return (
    <nav className="flex items-center gap-2" aria-label="Page switcher">
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(linkClasses, isActive ? activeClasses : inactiveClasses)
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/invoices"
        end
        className={({ isActive }) =>
          cn(linkClasses, isActive ? activeClasses : inactiveClasses)
        }
      >
        Invoices
      </NavLink>
    </nav>
  );
}
