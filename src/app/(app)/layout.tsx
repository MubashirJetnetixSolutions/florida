import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-screen overflow-hidden font-sans relative antialiased">
      <div
        className="bg-gradient-blob w-[500px] h-[500px] bg-accent-blue/30 top-[-100px] right-[-100px]"
        style={{ animationDuration: "25s" }}
      />
      <div
        className="bg-gradient-blob w-[450px] h-[450px] bg-accent-purple/20 bottom-[-50px] left-[20%]"
        style={{ animationDuration: "20s", animationDelay: "-5s" }}
      />
      <div
        className="bg-gradient-blob w-[350px] h-[350px] bg-accent-cyan/15 top-[30%] right-[15%]"
        style={{ animationDuration: "18s", animationDelay: "-10s" }}
      />

      <div className="flex flex-1 w-full relative z-10">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto p-6 md:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
