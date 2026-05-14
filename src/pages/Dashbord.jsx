import DashboardLayout from "../layouts/DashboardLayout";
import Navbar from "../components/dashbord/Navbar";
import SearchBar from "../components/dashbord/SearchBar";
import FilterDropdown from "../components/dashbord/FilterDropdown";
import ProjectGrid from "../components/dashbord/ProjectGrid";
import DashboardHeader from "../components/dashbord/DashboardHeader";
import CreateProjectModal from "../components/project/CreateProjectModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../store/projectSlice";
import Axios from "../utils/Axios";
import SummaryApi from "../commonApi's/SummaryApi";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const projects = useSelector((state) => state.project.projects);

  // FETCH ALL PROJECTS
  const fetchAllProject = async () => {
    try {
      setLoading(true);

      console.log("running fetchAllProject");

      const response = await Axios({
        ...SummaryApi.getAllProject,
      });

      console.log("response from all project", response);

      const data = response.data;

      if (data?.success) {
        dispatch(setProjects(data.projects));
      }
    } catch (error) {
      console.log("error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProject();
  }, []);

  return (
    <DashboardLayout>
      {/* TOP NAVBAR */}
      <Navbar />

      {/* HEADER */}
      <DashboardHeader setOpenModal={setOpenModal} />

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <div className="flex-1">
          <SearchBar />
        </div>

        <FilterDropdown />
      </div>

      {/* PROJECT GRID */}
      <ProjectGrid projects={projects || []} />

      {/* CREATE PROJECT MODAL */}
      <CreateProjectModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        fetchAllProject={fetchAllProject}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
