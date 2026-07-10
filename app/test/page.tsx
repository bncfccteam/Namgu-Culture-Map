'use client';

import { useState } from "react";

export default function TestPage() {
  const [text, setText] = useState("초기");

  return (
    <main>
      <div>{text}</div>

      <button
        onClick={() => {
          alert("클릭");
          setText("변경");
        }}
      >
        테스트
      </button>
    </main>
  );
}