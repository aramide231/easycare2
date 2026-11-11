import type { ReactNode } from "react";
import { categoryComponents } from "./CategoryRenderer";
import { subCategoryMap } from "../config/subCategoryMap";

export const categoryRegistry: Record<string, Record<string, ReactNode>> =
  Object.fromEntries(
    ["Ante Natal Care", "Child Birth"].map((category) => [
      category,
      Object.fromEntries(subCategoryMap[category].map(({ label }) => {
        const Component = categoryComponents[label];
        return [label, Component ? <Component /> : null];
      })),
    ]),
  );
