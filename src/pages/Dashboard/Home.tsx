import useLocalStorage from '../../hooks/useLocalStorage';
import type { DashboardLayout, GridConfig } from '../../models/DashboardWidget';
import DashboardGrid from '../../components/Dashboard/Widgets/DashboardGrid';

const initialGrid: GridConfig = { cols: 12, rowHeight: 32, gap: 8 };
const initialLayout: DashboardLayout = [
  {
    id: 'card-1',
    type: 'card',
    title: 'Welcome',
    position: { x: 0, y: 0, w: 4, h: 3 },
    props: { content: 'Welcome to your dashboard' },
  },
  {
    id: 'stat-1',
    type: 'stat',
    title: 'Active Users',
    position: { x: 4, y: 0, w: 3, h: 3 },
    props: { value: 1284, label: 'Users' },
  },
  {
    id: 'progress-1',
    type: 'progress',
    title: 'Setup Progress',
    position: { x: 7, y: 0, w: 3, h: 3 },
    props: { value: 76 },
  },
  {
    id: 'activity-1',
    type: 'activity',
    title: 'Recent Activity',
    position: { x: 0, y: 3, w: 10, h: 4 },
    props: { items: ['Created project “Alpha”', 'Invited user Jane', 'Updated settings'] },
  },
  {
    id: 'chart-1',
    type: 'chart',
    title: 'Signups (Last 7 days)',
    position: { x: 10, y: 0, w: 2, h: 3 },
    props: { kind: 'bar', data: [4, 7, 6, 10, 12, 9, 5], color: '#4f46e5' },
  },
];

const Home = (): JSX.Element => {
  // Persist layout to localStorage so positions/sizes and actions survive reloads
  const [layout, setLayout] = useLocalStorage<DashboardLayout>('dashboard-layout', initialLayout);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Home Page Dashboard</h1>
      <DashboardGrid
        grid={initialGrid}
        widgets={layout}
        onLayoutChange={setLayout}
        enableDrag={true}
        enableResize={true}
        showActions={true}
        persistKey={'dashboard-layout'}
      />
    </div>
  );
};

export default Home;
