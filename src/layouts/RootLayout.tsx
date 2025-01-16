import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const username = "Nombre de Usuario"; // This should come from your auth system

  return (
    <div className="min-h-screen">
      <Navbar onMenuClick={() => setSidebarOpen(true)} username={username} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        username={username}
      />
      <main className="lg:ml-64 pt-16 min-h-screen bg-gray-50 relative z-0">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
