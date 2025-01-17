import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuthContext } from "../context/AuthContext";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar
        onMenuClick={() => {
          setSidebarOpen(!sidebarOpen);
        }}
        username={user?.username ?? "Usuario"}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        username={user?.username ?? "Usuario"}
      />
      <main className="lg:ml-80 bg-gray-100 mt-6 pt-16 min-h-screen relative z-0">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
