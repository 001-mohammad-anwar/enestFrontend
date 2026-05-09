import Sidebar from "../components/dashbord/Sidebar";


const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      {/* SIDEBAR */}
      <Sidebar />



      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
};

export default DashboardLayout;