import { NavLink } from "react-router-dom";
import { Receipt } from "lucide-react";
import { NavButtons } from "./NavButtons";

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-xs sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Receipt className="w-5 h-5" />
            </div>
            <span className="font-semibold text-base sm:text-lg text-gray-900 tracking-tight">
              Hardware Expense Tracker
            </span>
          </NavLink>

          <NavButtons />
        </div>
      </div>
    </header>
  );
}
