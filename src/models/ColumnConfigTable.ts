export interface ColumnConfigTable<T> {
    // Allow key to be a single key or an array of keys
    key: keyof T | (keyof T)[];
    title: string;
    /**
     * Optional custom renderer.
     * If key is an array, value will be an array of values.
     */
    render?: (value: T[keyof T] | (T[keyof T] | string)[], row: T, setPopover: (popover: { anchor: HTMLElement | null, content: React.ReactNode }) => void) => React.ReactNode;
}