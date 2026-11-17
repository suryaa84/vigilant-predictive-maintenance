import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { DEMO_MACHINES } from './data/mockData';
import type { Machine } from './types';
import { AppLayout } from './components/layout/AppLayout';
import { OverviewPage } from './pages/OverviewPage';
import { PlaceholderPage } from './pages/PlaceholderPage';

export function App() {
  const [selectedMachine, setSelectedMachine] = useState<Machine>(DEMO_MACHINES[0]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AppLayout
                selectedMachine={selectedMachine}
                onSelectMachine={setSelectedMachine}
              />
            }
          >
            {/* Overview Dashboard */}
            <Route
              path="/"
              element={
                <OverviewPage
                  machine={selectedMachine}
                  onSelectMachine={setSelectedMachine}
                />
              }
            />
            <Route path="/overview" element={<Navigate to="/" replace />} />

            {/* Planned Milestone Pages */}
            <Route path="/live-monitoring" element={<PlaceholderPage />} />
            <Route path="/machine-health" element={<PlaceholderPage />} />
            <Route path="/fault-detection" element={<PlaceholderPage />} />
            <Route path="/rul-prediction" element={<PlaceholderPage />} />
            <Route path="/maintenance-history" element={<PlaceholderPage />} />
            <Route path="/settings" element={<PlaceholderPage />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
