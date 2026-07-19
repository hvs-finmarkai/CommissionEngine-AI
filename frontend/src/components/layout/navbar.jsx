import { useState } from "react";
import { Search, Bell, Calendar, Menu, ChevronDown } from "lucide-react";

export default function Navbar({ onMenuToggle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center gap-4 px-4 lg:px-6">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees, plans, KPIs..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
          <Calendar size={14} />
          <span className="hidden sm:inline">Oct 2024 (Current)</span>
        </button>

        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
            5
          </span>
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-gray-50"
          >
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">AD</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900 leading-tight">Anita Desai</p>
              <p className="text-xs text-gray-500 leading-tight">Finance Manager</p>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Anita Desai</p>
                  <p className="text-xs text-gray-500">Finance Manager</p>
                </div>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Profile
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Preferences
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
