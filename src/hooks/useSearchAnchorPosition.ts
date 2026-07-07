import { useEffect, useState, type RefObject } from "react";

export type SearchAnchorRect = {
  top: number;
  left: number;
  width: number;
};

function getContentBounds(): Pick<SearchAnchorRect, "left" | "width"> | null {
  const panelRegion = document.querySelector("[data-search-panel-region]");
  if (panelRegion) {
    const bounds = panelRegion.getBoundingClientRect();
    return { left: bounds.left, width: bounds.width };
  }

  const pageContent = document.querySelector("[data-app-page-content]");
  if (pageContent) {
    const bounds = pageContent.getBoundingClientRect();
    const style = window.getComputedStyle(pageContent);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    return {
      left: bounds.left + paddingLeft,
      width: bounds.width - paddingLeft - paddingRight,
    };
  }

  const main = document.querySelector("main");
  if (!main) return null;

  const bounds = main.getBoundingClientRect();
  const inset = window.matchMedia("(min-width: 768px)").matches ? 24 : 16;
  return {
    left: bounds.left + inset,
    width: bounds.width - inset * 2,
  };
}

export function useSearchAnchorPosition(
  anchorRef: RefObject<HTMLElement | null>,
  open: boolean,
) {
  const [rect, setRect] = useState<SearchAnchorRect | null>(null);

  useEffect(() => {
    if (!open) {
      setRect(null);
      return;
    }

    const update = () => {
      const header =
        anchorRef.current?.closest("header") ??
        document.querySelector("header");
      const contentBounds = getContentBounds();

      if (!header || !contentBounds) return;

      const headerBounds = header.getBoundingClientRect();

      setRect({
        top: headerBounds.bottom + 12,
        left: contentBounds.left,
        width: Math.max(contentBounds.width, 320),
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [anchorRef, open]);

  return rect;
}
