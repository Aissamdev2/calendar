export default function Modal({
  children,}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex absolute justify-center items-center h-[calc(100vh-100px)] w-screen backdrop-blur-[2px] z-[100] after:w-screen after:content-[''] after:h-screen after:bg-[#0000002f] after:absolute after:top-0 after:left-0">
      {children}
    </div>
  );
}