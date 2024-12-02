import Header from "@/app/ui/header";

export default function GemifLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex justify-center items-end h-[90%] w-screen bg-[#eaf3ff]">
        {children}
      </main>
    </>
  );
}