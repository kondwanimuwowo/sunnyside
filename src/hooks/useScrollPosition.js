import { useState, useEffect, useRef } from "react";

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset;
        const nextDirection =
          currentScrollY > lastScrollY.current ? "down" : "up";

        setScrollPosition((prev) =>
          prev === currentScrollY ? prev : currentScrollY
        );
        setScrollDirection((prev) =>
          prev === nextDirection ? prev : nextDirection
        );

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollPosition, scrollDirection };
};
