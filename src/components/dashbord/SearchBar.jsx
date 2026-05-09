import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Axios from "../../utils/Axios";
import { useDispatch } from "react-redux";
import { setProjects } from "../../store/projectSlice";
import SummaryApi from "../../commonApi's/SummaryApi";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(search);
    }, 400); // debounce

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleSearch = async (value) => {
    if (!value.trim()) {
      return; // ❌ prevent empty API call
    }

    try {
      const response = await Axios({
        ...SummaryApi.searchProjects,
        params: { q: value },
      });
      console.log("search project ", response)

      if (response.data?.success) {
        dispatch(setProjects(response.data.projects));
      }

    } catch (error) {
      console.log("SEARCH ERROR:", error);
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search projects..."
        className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 border"
      />
    </div>
  );
};

export default SearchBar;