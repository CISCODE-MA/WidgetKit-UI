export interface ColumnConfigTable<T> {
  // Allow key to be a single key or an array of keys
  key: keyof T | (keyof T)[];
  title: string;
  /**
   * Optional custom renderer.
   * If key is an array, value will be an array of values.
   */
  render?: (
    value: T[keyof T] | (T[keyof T] | string)[],
    row: T,
    setPopover: (popover: { anchor: HTMLElement | null; content: React.ReactNode }) => void,
  ) => React.ReactNode;

  /** Sorting configuration */
  sortable?: boolean;
  sortComparator?: (a: unknown, b: unknown, rowA: T, rowB: T) => number;

  /** Filtering configuration */
  filterable?: boolean;
  filterPredicate?: (value: unknown, row: T, query: string) => boolean;

  /** Inline editing configuration */
  editable?: boolean;
  editor?: (args: {
    value: unknown;
    row: T;
    rowIndex: number;
    onChange: (next: unknown) => void;
    onCommit: () => void;
    onCancel: () => void;
  }) => React.ReactNode;

  /** Optional className for the cell */
  cellClassName?: string;
}
