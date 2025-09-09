import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Settings,
  FileText,
  Users,
  MessageCircle,
  List,
  Folder,
  Play,
  File,
} from "lucide-react";
import "./search.css";

const DribbbleSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isSearching, setIsSearching] = useState(false);
  const [showInterface, setShowInterface] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // ✅ keep filters in state so they can toggle
  const [filterOptions, setFilterOptions] = useState([
    { name: "Files", icon: FileText, enabled: true },
    { name: "People", icon: Users, enabled: true },
    { name: "Chats", icon: MessageCircle, enabled: false },
    { name: "Lists", icon: List, enabled: false },
  ]);
  const [filters, setFilters] = useState(filterOptions);
  const searchInputRef = useRef(null);

  const onToggleFilter = (name) => {
    setFilters((prev) =>
      prev.map((f) => (f.name === name ? { ...f, enabled: !f.enabled } : f))
    );
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "s" && !e.target.matches("input, textarea")) {
        e.preventDefault(); // prevent typing "s" in other places
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchResults = [
    {
      id: 1,
      type: "person",
      name: "Caroline Dribsson",
      status: "Unactivated",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 2,
      type: "person",
      name: "Adam Cadribean",
      status: "Active 1w ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 3,
      type: "file",
      name: "final_dribbble_presentation.jpg",
      details: "in Presentations • Edited 1w ago",
      icon: File,
    },
    {
      id: 4,
      type: "person",
      name: "Margareth Cendribgssen",
      status: "Active 1w ago",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 5,
      type: "video",
      name: "dribbble_animation.avi",
      details: "in Videos • Added 1y ago",
      icon: Play,
    },
    {
      id: 6,
      type: "folder",
      name: "Dribbble Folder",
      details: "12 Files in Projects • Edited 2m ago",
      icon: Folder,
    },
  ];
  // derive tabs from filters
  const tabs = [
    { name: "All", count: searchResults.length }, // always show All
    ...filters
      .filter((f) => f.enabled) // only enabled filters become tabs
      .map((f) => ({
        name: f.name,
        count: searchResults.filter((r) =>
          r.type.toLowerCase().includes(f.name.toLowerCase())
        ).length,
      })),
  ];

  const handleSearch = (value) => {
    setSearchQuery(value);

    if (value.length > 0) {
      if (!showInterface) {
        setShowInterface(true);
      }
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        setShowResults(true);
      }, 800);
    } else {
      setShowResults(false);
      setIsSearching(false);
      setTimeout(() => {
        setShowInterface(false);
      }, 300);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setIsSearching(false);
    setTimeout(() => {
      setShowInterface(false);
    }, 300);
  };

  // ✅ toggle filter
  const toggleFilter = (name) => {
    setFilterOptions((prev) =>
      prev.map((option) =>
        option.name === name ? { ...option, enabled: !option.enabled } : option
      )
    );
  };

  const getResultIcon = (result) => {
    if (result.type === "person") {
      return (
        <img
          src={result.avatar}
          alt={result.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    }

    const IconComponent = result.icon;
    const iconColors = {
      file: "text-blue-500",
      video: "text-purple-500",
      folder: "text-yellow-600",
    };

    return (
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
        <IconComponent
          className={`w-5 h-5 ${iconColors[result.type] || "text-gray-500"}`}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className={`search-box ${showInterface ? "expanded" : ""}`}>
        {/* Search Header */}
        <div className="">
          <div className=" w-full h-[60px] flex items-center relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              ref={searchInputRef} // ✅ attach ref
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Searching is easier"
              className="w-full pl-12 pr-20 py-3 bg-white  rounded-xl text-base outline-none focus:bg-white  transition-all duration-300"
            />

            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors font-medium"
              >
                Clear
              </button>
            )}

            {!searchQuery && !showInterface && (
              <div className="absolute right-4 flex items-center space-x-2 text-gray-400 text-sm">
                <span className="px-2 py-0.5 border rounded-md text-xs bg-gray-50">
                  S
                </span>
                <span>quick access</span>
              </div>
            )}
          </div>
        </div>

        {/* Expandable Interface */}
        <div className={`interface ${showInterface ? "open" : ""}`}>
          {/* Tabs */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex items-center space-x-2 pb-2 border-b-2 transition-all duration-300 ${
                      activeTab === tab.name
                        ? "border-black text-black font-medium"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <span>{tab.name}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
                >
                  <Settings className="w-5 h-5 text-gray-400" />
                </button>

                {/* Filter Menu */}
                <div className={`filter-menu ${showFilterMenu ? "open" : ""}`}>
                  {filters.map((option) => (
                    <div
                      key={option.name}
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => onToggleFilter(option.name)}
                    >
                      <div className="flex items-center space-x-3">
                        <option.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{option.name}</span>
                      </div>
                      <div
                        className={`w-10 h-6 rounded-full flex items-center transition-colors duration-200 ${
                          option.enabled ? "bg-black" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${
                            option.enabled ? "translate-x-5" : "translate-x-1"
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Loading */}
          {isSearching && (
            <div className="px-6 py-6 space-y-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="flex items-center space-x-4 animate-pulse"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {showResults && !isSearching && (
            <div className="px-6 pb-6">
              <div className="space-y-1">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-300"
                  >
                    {getResultIcon(result)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {result.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {result.status || result.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {showFilterMenu && (
        <div
          className="fixed z-0"
          onClick={() => setShowFilterMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default DribbbleSearch;
