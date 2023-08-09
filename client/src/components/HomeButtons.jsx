import React from "react";
import { Link } from "react-router-dom";
export function HomeButton({ name }) {
  return (
    <div className="w-[260px] h-[160px] rounded-md border border-black flex justify-center items-center">
      <div className="p-4">
        <button type="button">{name}</button>
      </div>
    </div>
  );
}
