'use client';

import { useEffect, useRef, useState } from 'react';

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
