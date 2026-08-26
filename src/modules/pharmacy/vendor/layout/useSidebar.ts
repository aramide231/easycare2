import { useState, useEffect, useCallback } from "react";

export const useSidebar = (
  defaultWidth = 265,
  minWidth = 88,
  maxWidth = 300,
) => {
  const [width, setWidth] = useState(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const startResizing = useCallback(() => setIsDragging(true), []);
  const stopResizing = useCallback(() => setIsDragging(false), []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newWidth = e.clientX;

        if (newWidth < 150) {
          setIsCollapsed(true);
          setWidth(minWidth);
        } else if (newWidth <= maxWidth) {
          setIsCollapsed(false);
          setWidth(newWidth);
        }
      }
    },
    [isDragging, minWidth, maxWidth],
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setWidth(!isCollapsed ? minWidth : defaultWidth);
  };

  return { width, isDragging, isCollapsed, startResizing, toggleCollapse };
};
