import { useFormStatus, useFormState } from "react-dom";
import { addEvent } from "@/app/lib/actions";
import { useEffect, useState } from "react";


export default function InfoModal({ id }: { id: string }) {


  return (
    <div className="flex absolute justify-center items-center h-[calc(100vh-100px)] w-screen backdrop-blur-[2px] z-10">
      <div className="flex flex-col items-center gap-[30px] bg-white w-fit h-fit rounded-xl border-[1px] border-black p-10">
        
      </div>
    </div>
  );
}
