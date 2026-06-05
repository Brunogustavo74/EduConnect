"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import AuthWall from "@/components/layout/AuthWall";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthWall>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px]">
          <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthWall>
  );
}
