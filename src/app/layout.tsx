import "../style/globals.css";
import Sidebar from "@/app/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="flex gap-3 bg-[#0A0E1A]">
          <Sidebar />
          <div className="w-full h-screen overflow-auto p-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
