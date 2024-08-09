export default function CalendarSkeleton() {
  return (
    <main className="flex justify-center items-end h-[calc(100vh-80px)] w-screen bg-[#e8e8e8] p-5 absolute bottom-0 left-0">
      <div className="bg-white w-full h-full rounded-xl flex flex-col">
        <div className="flex justify-center items-center flex-grow-[1] basis-2 gap-8 text-xl animate-pulse">
          <span className="hover:cursor-pointer bg-gray-200 w-8 h-5"></span>
          <span className="hover:cursor-pointer bg-gray-200 w-14 h-7"></span>
          <span className="hover:cursor-pointer bg-gray-200 w-8 h-5"></span>
        </div>
        <div className="grid flex-grow-[1] grid-cols-7 gap-1 p-2 border-b-[1px] border-gray-200 animate-pulse">
          {
            Array(7).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg " />
          ))
          }
      </div>
        <div className="bg-white rounded-b-xl flex-grow-[11] grid grid-cols-7 gap-1 p-2 animate-pulse">
          {
            Array(42).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg" />
            ))
          }
        </div>
      </div>
    </main>
  );
}