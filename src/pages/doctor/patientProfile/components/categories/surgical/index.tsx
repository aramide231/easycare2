import PreOperationNote from "./PreOperationNote";
import PostOperationNote from "./PostOperationNotes";
import PostOperationOrders from "./PostOperationOrders";

/** Surgical forms — Figma-aligned layouts. */
export const surgicalRenderer: Record<string, React.ReactNode> = {
  "PRE-OPERATION NOTE": <PreOperationNote />,
  "POST-OPERATION NOTE": <PostOperationNote />,
  "POST-OPERATION ORDERS": <PostOperationOrders />,
};
