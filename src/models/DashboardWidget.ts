export type WidgetType = 'card' | 'stat' | 'progress' | 'activity' | 'chart' | 'custom';

export type WidgetId = string;

export type WidgetPosition = {
  x: number; // column index (0-based)
  y: number; // row index (0-based)
  w: number; // width in columns
  h: number; // height in rows
};

export type BaseWidgetConfig = {
  id: WidgetId;
  type: WidgetType;
  title?: string;
  position: WidgetPosition;
  // Arbitrary props for the specific widget implementation
  props?: Record<string, unknown>;
};

export type DashboardLayout = BaseWidgetConfig[];

export type GridConfig = {
  cols: number; // number of columns in the grid
  rowHeight: number; // height of one grid row in pixels
  gap: number; // gap between grid cells in pixels
};

export type LayoutChange = {
  id: WidgetId;
  position: WidgetPosition;
};

// Chart adapter types (host-selectable)
export type ChartKind = 'line' | 'bar' | 'pie';

export type ChartAdapter = {
  render: (kind: ChartKind, props: Record<string, unknown>) => JSX.Element;
};
