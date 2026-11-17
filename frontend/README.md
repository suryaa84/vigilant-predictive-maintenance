# VIGILANT Frontend — Milestone 1

Modern industrial SaaS dashboard for predictive maintenance of rotating equipment.

## Theme System (Dark & Light Mode)

The platform supports a complete dual-theme design system:
- **Dark Mode** (Default): Deep navy (`#080b11`, `#0b0f17`, `#0d121e`) layered panels with restrained emerald, amber, and rose accents.
- **Light Mode**: Crisp white (`#ffffff`) and cool slate surfaces (`#f4f6fa`, `#f8fafc`) with subtle borders, navy text (`#0f172a`), balanced card shadows, and vibrant industrial status indicators.
- **Persistence**: Remembers user preference in `localStorage('vigilant-theme')` with zero-flash pre-hydration script in `index.html`.
- **Dynamic Charts**: Recharts Cartesian grids, axes, reference lines, and tooltips automatically sync with active theme.

## Scripts

- `npm run dev` — Starts local Vite development server
- `npm run build` — Compiles TypeScript (`tsc -b`) and bundles production assets with Vite
- `npm run lint` — Runs ESLint rules
- `npm run preview` — Locally previews production build

## Architecture & File Structure

```
src/
├── context/
│   ├── ThemeContextDefinition.ts # Theme context contract & types
│   ├── ThemeProvider.tsx         # Theme provider with localStorage synchronization
│   └── useTheme.ts               # Custom React hook for theme consumption
├── types/
│   └── index.ts                  # Strong TypeScript contracts for telemetry & machines
├── data/
│   └── mockData.ts               # High-fidelity simulated industrial datasets (ISO 10816-3)
├── components/
│   ├── common/
│   │   ├── Badge.tsx             # Theme-aware industrial severity status tags
│   │   ├── DemoTag.tsx           # Consistent MOCK/DEMO indicator badge
│   │   ├── StatusPill.tsx        # Live status indicators (healthy, warning, critical, offline)
│   │   └── ThemeToggle.tsx       # Sun/Moon top navbar theme toggle button
│   ├── layout/
│   │   ├── AppLayout.tsx         # Persistent shell layout with responsive margins
│   │   ├── Sidebar.tsx           # Collapsible desktop & mobile navigation sidebar
│   │   ├── Header.tsx            # Machine selector, theme toggle, notifications, profile
│   │   └── NotificationDrawer.tsx # Simulated alerts popover with timestamped events
│   └── dashboard/
│       ├── SystemStatusStrip.tsx    # Hardware disconnected notice with expandable roadmap
│       ├── KpiCard.tsx              # 4 core KPI metric cards (Health, RPM, Temp, Vibration)
│       ├── SensorTrendsChart.tsx    # Theme-aware Recharts timeseries with range selector
│       ├── MachineStatusCard.tsx    # Asset details, uptime, speed, inspection schedule
│       ├── FaultDistributionCard.tsx # Theme-aware Recharts donut & breakdown list
│       ├── RecentAlertsList.tsx     # Simulated events with severity filters & acknowledgment
│       └── MaintenanceSummaryCard.tsx # Next inspection window, CBM actions, work orders
├── pages/
│   ├── OverviewPage.tsx          # Flagship industrial dashboard
│   └── PlaceholderPage.tsx       # Polished placeholder screens with future milestone specs
├── App.tsx                       # Theme provider & React Router routing
├── main.tsx                      # React root mount
└── index.css                     # Tailwind CSS v4 tokens, custom variants, and scrollbars
```
