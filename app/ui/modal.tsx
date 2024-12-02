export default function Modal({
  children,}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex absolute justify-center items-center h-full w-screen after:backdrop-blur-[2px] z-[100] after:w-full after:content-[''] after:h-full after:bg-[#0000002f] after:absolute after:bottom-0 after:left-0">
      {children}
    </div>
  );
}