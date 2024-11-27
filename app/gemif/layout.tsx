import Header from "@/app/ui/header";

export default function GemifLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}