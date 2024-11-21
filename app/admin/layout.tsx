import type { Metadata } from "next";
import { Navbar } from "./_components/navbar";
import { RoleGate } from "@/components/role-gate";
import { UserRole } from "@prisma/client";


export const metadata: Metadata = {
  title: "NJ Electronics | Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <RoleGate allowedRoles={[UserRole.ADMIN]}>
      <div className="flex flex-col md:flex-row min-h-screen min-w-screen">
          <div className="w-screen h-screen pb-24 sm:pl-16 md:pb-0">
          {children}
          </div>
          <Navbar />
      </div>
    // </RoleGate>
  );
}
