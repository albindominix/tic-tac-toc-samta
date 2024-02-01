import React, { useState } from "react";

function Square({ value,onSquareClick }) {
  return (
    <button 
    className={`border border-black  w-[5rem] h-[6.25rem] font-bold ${value==='X'?'text-blue-600':'text-red-600'} text-6xl text-center`} 
    onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
