import { useState, useEffect } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollPercent =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-999">
      <div
        className="h-full bg-green-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;