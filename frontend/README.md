# VIGILANT Frontend — Milestone 1

Modern industrial SaaS dashboard for predictive maintenance of rotating equipment.

## Scripts

- `npm run dev` — Starts local Vite development server
- `npm run build` — Compiles TypeScript (`tsc -b`) and bundles production assets with Vite
- `npm run lint` — Runs ESLint rules
- `npm run preview` — Locally previews production build

## Architecture & File Structure

```
src/
├── types/
│   └── index.ts                 # Strong TypeScript contracts for telemetry & machines
├── data/
│   └── mockData.ts              # High-fidelity simulated industrial datasets (ISO 10816-3)
├── components/
│   ├── common/
│   │   ├── Badge.tsx            # Industrial severity status tags
│   │   ├── DemoTag.tsx          # Consistent MOCK/DEMO indicator badge
│   │   └── StatusPill.tsx       # Live status indicators (healthy, warning, critical, offline)
│   ├── layout/
│   │   ├── AppLayout.tsx        # Persistent shell layout with responsive margins
│   │   ├── Sidebar.tsx          # Collapsible desktop & mobile navigation sidebar
│   │   ├── Header.tsx           # Machine selector, notifications, breadcrumb, profile
│   │   └── NotificationDrawer.tsx # Simulated alerts popover with timestamped events
│   └── dashboard/
│       ├── SystemStatusStrip.tsx    # Prominent hardware disconnected / mock notice
│       ├── KpiCard.tsx              # 4 core KPI metric cards (Health, RPM, Temp, Vibration)
│       ├── SensorTrendsChart.tsx    # Recharts multi-sensor timeseries with range selector
│       ├── MachineStatusCard.tsx    # Asset details, uptime, speed, inspection schedule
│       ├── FaultDistributionCard.tsx # Recharts donut & breakdown list
│       ├── RecentAlertsList.tsx     # Simulated events with severity filters & acknowledgment
│       └── MaintenanceSummaryCard.tsx # Next inspection window, CBM actions, work orders
├── pages/
│   ├── OverviewPage.tsx         # Milestone 1 flagship industrial dashboard
│   └── PlaceholderPage.tsx      # Polished placeholder screens with future milestone specs
├── App.tsx                      # React Router provider & state management
├── main.tsx                     # React root mount
└── index.css                    # Tailwind CSS v4 configuration & theme styling
```
