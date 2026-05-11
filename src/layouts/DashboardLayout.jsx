import Sidebar from "../components/dashbord/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="md:ml-[260px] p-4 pt-24 md:p-8 md:pt-8">
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;