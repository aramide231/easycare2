type MainStoreHandlers = {
  onAdd: () => void;
};

let handlers: MainStoreHandlers | null = null;

export function registerMainStoreHandlers(next: MainStoreHandlers) {
  handlers = next;
  return () => {
    if (handlers === next) handlers = null;
  };
}

export function runMainStoreAdd() {
  handlers?.onAdd();
}
