import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuthContext } from "../context/AuthContext";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen">
      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
        username={user?.username ?? "Usuario"}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        username={user?.username ?? "Usuario"}
      />
      <main className="lg:ml-64 pt-16 min-h-screen bg-gray-50 relative z-0">
        <Outlet />
      </main>
    </div>
  );
}
