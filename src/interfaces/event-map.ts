interface EventMap<T> {
  result: (result: T[]) => void;
  changed: (addedItems: T[], removedItems: T[], result: T[]) => void;
  added: (addedItems: T[], result: T[]) => void;
  removed: (removedItems: T[], result: T[]) => void;
  error: (error: any) => void;
}

export default EventMap;
