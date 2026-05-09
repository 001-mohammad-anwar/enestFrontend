
import AppRoutes from "./routes/AppRouter";
import toast, { Toaster } from "react-hot-toast";


function App() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
       <AppRoutes />
       <Toaster />
    </div>
  );
}

export default App;