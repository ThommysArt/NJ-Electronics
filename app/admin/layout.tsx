import type { Metadata } from "next";
import { Navbar } from "./_components/navbar";


export const metadata: Metadata = {
  title: "NJ Electronics | Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen min-w-screen">
        <div className="w-screen h-screen sm:pl-16">
        {children}
        </div>
        <Navbar />
    </div>
  );
}
