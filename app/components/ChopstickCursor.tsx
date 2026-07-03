'use client';

import { useEffect, useState } from 'react';

export default function ChopstickCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });

      const target = event.target as HTMLElement | null;
      const interactive = !!target?.closest('a, button, input, textarea, select, [role="button"]');
      setIsPointer(interactive);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', updateCursor);
    window.addEventListener('mouseup', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', updateCursor);
      window.removeEventListener('mouseup', updateCursor);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7a1f2b]/30 transition-transform duration-150"
        style={{ left: position.x, top: position.y, transform: `translate(-50%, -50%) scale(${isPointer ? 0.75 : 1})` }}
      />
      <div
        className={`pointer-events-none fixed z-[9998] h-14 w-14 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${isPointer ? 'opacity-70' : 'opacity-100'}`}
        style={{ left: position.x, top: position.y }}
        aria-hidden="true"
      >
        <div className="absolute left-[45%] top-1/2 h-1.5 w-9 -translate-y-1/2 -translate-x-[60%] rotate-[-28deg] rounded-full bg-[#7a1f2b] shadow-[0_0_10px_rgba(122,31,43,0.25)]" />
        <div className="absolute left-[55%] top-1/2 h-1.5 w-9 -translate-y-1/2 -translate-x-[40%] rotate-[28deg] rounded-full bg-[#1b6b4a] shadow-[0_0_10px_rgba(27,107,74,0.25)]" />
        <div className="absolute left-[47%] top-[42%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8b84b]" />
      </div>
    </>
  );
}
