import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FaAnglesDown } from "react-icons/fa6";
import "./ScrollArrows.css";

const ScrollArrow = ({ children }) => {
  const [showScrollDown, setShowScrollDown] = useState(false);
  const containerRef = useRef(null);
  const location = useLocation(); // Detect route changes

  const checkScrollPosition = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollDown(scrollTop + clientHeight < scrollHeight - 5);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => checkScrollPosition();

    checkScrollPosition(); // Initial check
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  // Re-check scroll position on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      containerRef.current?.scrollTo({ top: 0 });
      checkScrollPosition();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-container" ref={containerRef}>
      {children}

      <button
        className={`scroll-button scroll-down ${
          showScrollDown ? "visible" : ""
        }`}
        onClick={scrollToBottom}
        aria-label="Scroll down"
      >
        <FaAnglesDown />
      </button>
    </div>
  );
};

export default ScrollArrow;
