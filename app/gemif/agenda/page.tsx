export default function Agenda() {
  return (
    <main className="flex justify-center items-end h-[calc(100vh-80px)] w-screen bg-[#e8e8e8] p-5 absolute bottom-0 left-0">
      <div className="bg-white w-full h-full rounded-xl flex flex-col">
        <div className="flex justify-center items-center flex-grow-[1] basis-2 gap-8 text-xl border-b-[1px] border-gray-200">
          <span className="hover:cursor-pointer">{'<'}</span>
          <span className="hover:cursor-pointer">{'Agosto'}</span>
          <span className="hover:cursor-pointer">{'>'}</span>
        </div>
        <div className="bg-white rounded-b-xl flex-grow-[11]">

        </div>
      </div>
    </main>
  );
}