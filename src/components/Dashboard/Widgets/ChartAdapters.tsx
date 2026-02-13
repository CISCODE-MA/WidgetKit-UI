import type { JSX } from 'react';
import type { ChartAdapter, ChartKind } from '../../../models/DashboardWidget';

// Minimal default chart adapter using plain SVG.
export const DefaultChartAdapter: ChartAdapter = {
  render(kind: ChartKind, props: Record<string, unknown>): JSX.Element {
    switch (kind) {
      case 'bar':
        return renderBar(props);
      case 'line':
        return renderLine(props);
      case 'pie':
        return renderPie(props);
      default:
        return <div className="text-xs text-gray-500 dark:text-gray-400">Unknown chart kind</div>;
    }
  },
};

function coerceNumbers(value: unknown): number[] {
  if (Array.isArray(value)) {
    return value
      .map((v) => (typeof v === 'number' ? v : Number(v)))
      .filter((v) => !Number.isNaN(v));
  }
  return [];
}

function renderBar(props: Record<string, unknown>): JSX.Element {
  const data = coerceNumbers(props.data);
  const width = (typeof props.width === 'number' ? props.width : 300) as number;
  const height = (typeof props.height === 'number' ? props.height : 120) as number;
  const padding = 16;
  const max = Math.max(1, ...data);
  const barWidth = (width - padding * 2) / Math.max(1, data.length);
  const color = typeof props.color === 'string' ? (props.color as string) : '#4f46e5';

  return (
    <svg width={width} height={height} role="img" aria-label="Bar chart">
      {data.map((v, i) => {
        const h = ((height - padding * 2) * v) / max;
        const x = padding + i * barWidth + barWidth * 0.1;
        const y = height - padding - h;
        return <rect key={i} x={x} y={y} width={barWidth * 0.8} height={h} fill={color} rx={2} />;
      })}
    </svg>
  );
}

function renderLine(props: Record<string, unknown>): JSX.Element {
  const data = coerceNumbers(props.data);
  const width = (typeof props.width === 'number' ? props.width : 300) as number;
  const height = (typeof props.height === 'number' ? props.height : 120) as number;
  const padding = 16;
  const max = Math.max(1, ...data);
  const color = typeof props.color === 'string' ? (props.color as string) : '#16a34a';
  const points = data.map((v, i) => {
    const x = padding + i * ((width - padding * 2) / Math.max(1, data.length - 1));
    const y = height - padding - ((height - padding * 2) * v) / max;
    return `${x},${y}`;
  });

  return (
    <svg width={width} height={height} role="img" aria-label="Line chart">
      <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth={2} />
    </svg>
  );
}

function renderPie(props: Record<string, unknown>): JSX.Element {
  const data = coerceNumbers(props.data);
  const size = (typeof props.size === 'number' ? props.size : 120) as number;
  const radius = size / 2;
  const total = data.reduce((acc, v) => acc + v, 0) || 1;
  const colors = Array.isArray(props.colors)
    ? (props.colors as string[])
    : ['#f97316', '#22c55e', '#3b82f6', '#e11d48'];

  let startAngle = 0;
  const slices = data.map((v, i) => {
    const angle = (v / total) * Math.PI * 2;
    const x1 = radius + radius * Math.cos(startAngle);
    const y1 = radius + radius * Math.sin(startAngle);
    const x2 = radius + radius * Math.cos(startAngle + angle);
    const y2 = radius + radius * Math.sin(startAngle + angle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const path = `M ${radius},${radius} L ${x1},${y1} A ${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} z`;
    startAngle += angle;
    return <path key={i} d={path} fill={colors[i % colors.length]} />;
  });

  return (
    <svg width={size} height={size} role="img" aria-label="Pie chart">
      {slices}
    </svg>
  );
}
