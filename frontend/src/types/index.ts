export type MachineStatus = 'healthy' | 'warning' | 'critical' | 'offline';

export interface TelemetryNode {
  id: string;
  name: string;
  status: 'simulated' | 'connected' | 'disconnected';
  firmware: string;
  samplingRateHz: number;
  lastTransmission: string;
  rssi?: string;
}

export interface Machine {
  id: string;
  name: string;
  tag: string;
  type: string;
  status: MachineStatus;
  healthScore: number;
  location: string;
  uptime: number; // percentage e.g. 98.6
  operatingSpeedRpm: number;
  ratedSpeedRpm: number;
  ratedPowerKw: number;
  lastInspectionDate: string;
  nextInspectionDate: string;
  telemetryNode: TelemetryNode;
  description: string;
}

export interface KpiMetricItem {
  value: number;
  displayValue: string;
  unit: string;
  label: string;
  deltaPercent: number;
  trend: 'up' | 'down' | 'steady';
  status: 'normal' | 'warning' | 'critical' | 'healthy';
  benchmark: string;
  isoStandard?: string;
  isDemo: true;
}

export interface DashboardKpis {
  healthScore: KpiMetricItem;
  currentRpm: KpiMetricItem;
  temperature: KpiMetricItem;
  vibrationRms: KpiMetricItem;
}

export interface SensorDataPoint {
  time: string;
  fullTimestamp: string;
  vibrationRms: number; // mm/s
  vibrationPeak: number; // mm/s
  vibrationThreshold: number; // ISO limit
  temperature: number; // °C
  tempThreshold: number; // Limit
  acousticSound: number; // dB
  rpm: number;
}

export type TimeRange = '1h' | '6h' | '24h' | '7d';

export interface FaultCategory {
  id: string;
  name: string;
  percentage: number;
  sampleCount: number;
  severity: 'normal' | 'low' | 'medium' | 'high';
  color: string;
  trend: string;
  description: string;
}

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface AlertEvent {
  id: string;
  timestamp: string;
  relativeTime: string;
  machineId: string;
  machineName: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  sensor: string;
  reading: string;
  threshold: string;
  acknowledged: boolean;
  isSimulated: true;
}

export interface MaintenanceSummary {
  id: string;
  machineId: string;
  nextInspectionDate: string;
  daysRemaining: number;
  strategy: string;
  assignedEngineer: string;
  engineerRole: string;
  priority: 'High' | 'Medium' | 'Routine';
  recommendedAction: string;
  diagnosticFinding: string;
  partsRequired: string[];
  estimatedDowntimeHours: number;
  cmmsWorkOrderId: string;
}

export interface SystemStatus {
  hardwareConnected: boolean;
  gatewayStatus: 'MOCK_SIMULATED' | 'CONNECTED' | 'OFFLINE';
  backendApiStatus: 'LOCAL_MOCK' | 'CONNECTED' | 'DISCONNECTED';
  mlInferenceStatus: 'SYNTHETIC_DATASET' | 'LIVE_PIPELINE';
  activeProfile: string;
  simulatedSampleRate: string;
  notice: string;
}
