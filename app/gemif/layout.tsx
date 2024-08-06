import Header from "../ui/header";

export default function GemifLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}