import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  HeartPulse,
  AlertTriangle,
  TrendingDown,
  Wrench,
  Settings,
  ArrowLeft,
  Layers,
  Terminal,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { DemoTag } from '../components/common/DemoTag';

interface PageMeta {
  title: string;
  subtitle: string;
  milestone: 'Milestone 2' | 'Milestone 3';
  icon: React.ElementType;
  description: string;
  plannedFeatures: {
    title: string;
    description: string;
    tag: string;
  }[];
  technicalArchitecture: {
    component: string;
    technology: string;
    status: string;
  }[];
}

const MODULE_CONFIGS: Record<string, PageMeta> = {
  '/live-monitoring': {
    title: 'Live Telemetry & Sensor Streaming',
    subtitle: 'Real-time oscilloscope waveforms, acoustic frequency spectra and high-speed telemetry',
    milestone: 'Milestone 2',
    icon: Activity,
    description:
      'High-frequency sensor ingestion module designed to stream continuous tri-axial vibration, acoustic sound decibels, and temperature from the ESP32 node via MQTT WebSocket broker.',
    plannedFeatures: [
      {
        title: 'Real-Time Raw Waveform Oscilloscope',
        description: 'Time-domain acceleration waveforms sampled at 1,000 Hz to 10,000 Hz with pan and zoom capabilities.',
        tag: 'ESP32 ADC',
      },
      {
        title: 'Live Acoustic Spectrogram',
        description: 'Waterfall sound spectrum chart highlighting high-frequency micro-acoustic clicks and cavitation.',
        tag: 'MAX9814 Mic',
      },
      {
        title: 'Sub-Second Telemetry WebSockets',
        description: 'FastAPI WebSocket broker streaming live JSON telemetry frames directly to the client canvas.',
        tag: 'FastAPI WS',
      },
    ],
    technicalArchitecture: [
      { component: 'Hardware Edge', technology: 'ESP32 FreeRTOS DMA ADC', status: 'Hardware Milestone' },
      { component: 'Message Broker', technology: 'Mosquitto MQTT (TLS 8883)', status: 'Milestone 2' },
      { component: 'Backend Stream', technology: 'Python FastAPI WebSockets', status: 'Milestone 2' },
      { component: 'Timeseries DB', technology: 'TimescaleDB / InfluxDB', status: 'Milestone 2' },
    ],
  },
  '/machine-health': {
    title: 'Machine Health & Degradation Index',
    subtitle: 'ISO 10816 vibration severity matrix, thermal mapping, and holistic machinery diagnostics',
    milestone: 'Milestone 2',
    icon: HeartPulse,
    description:
      'Aggregated health indexing engine evaluating overall machinery condition across all rotating components against international vibration standards.',
    plannedFeatures: [
      {
        title: 'ISO 10816-3 Severity Zones',
        description: 'Dynamic mapping to Class I, II, III & IV vibration severity thresholds (Zone A to Zone D).',
        tag: 'ISO Standard',
      },
      {
        title: 'Component Health Decomposition',
        description: 'Individual sub-component health scoring for drive-end bearing, non-drive bearing, stator, and rotor.',
        tag: 'Analytics',
      },
      {
        title: 'Multi-Machine Fleet Comparison',
        description: 'Side-by-side health degradation matrices across plant facilities and operating bays.',
        tag: 'Fleet View',
      },
    ],
    technicalArchitecture: [
      { component: 'Calculation Engine', technology: 'NumPy / SciPy Signal Processing', status: 'Milestone 2' },
      { component: 'Threshold Matrix', technology: 'ISO 10816-3 Standard Rules', status: 'Configured' },
      { component: 'Storage Layer', technology: 'PostgreSQL Relational Storage', status: 'Milestone 2' },
    ],
  },
  '/fault-detection': {
    title: 'AI Fault Detection & Spectral Analysis',
    subtitle: 'Automated harmonic defect classification for imbalance, misalignment, and bearing races',
    milestone: 'Milestone 3',
    icon: AlertTriangle,
    description:
      'Deep learning and digital signal processing engine that analyzes Fast Fourier Transform (FFT) peaks and harmonic sidebands to pinpoint specific failure modes before functional breakdown.',
    plannedFeatures: [
      {
        title: 'FFT Spectral Peak Decomposition',
        description: 'Automated peak detection for 1X (Imbalance), 2X (Misalignment), and high-frequency cage orders.',
        tag: 'FFT DSP',
      },
      {
        title: 'Bearing Defect Frequency Overlay',
        description: 'Calculates kinematic BPFO, BPFI, BSF, and FTF fault frequencies based on bearing geometry.',
        tag: 'Kinematics',
      },
      {
        title: 'Unsupervised Anomaly Detection',
        description: 'PyTorch autoencoder trained on healthy operating baselines to detect novel vibration deviations.',
        tag: 'PyTorch ML',
      },
    ],
    technicalArchitecture: [
      { component: 'Feature Extractor', technology: 'FFT & Envelope Analysis (SciPy)', status: 'Milestone 3' },
      { component: 'ML Classifier', technology: 'Random Forest & Autoencoder', status: 'Milestone 3' },
      { component: 'Model Serving', technology: 'ONNX Runtime / TorchScript', status: 'Milestone 3' },
    ],
  },
  '/rul-prediction': {
    title: 'Remaining Useful Life (RUL) Modeling',
    subtitle: 'Weibull reliability hazard curves, LSTM time-to-failure forecasting, and maintenance runway',
    milestone: 'Milestone 3',
    icon: TrendingDown,
    description:
      'Prognostic modeling dashboard computing statistical time-to-failure confidence bounds and actionable countdowns to machine maintenance interventions.',
    plannedFeatures: [
      {
        title: 'LSTM Degradation Trajectory Forecasting',
        description: 'Recurrent neural networks projecting exponential vibration and temperature progression curves.',
        tag: 'LSTM Model',
      },
      {
        title: 'Weibull Reliability Hazard Estimation',
        description: 'Survival analysis calculating probability of failure over remaining operational operating hours.',
        tag: 'Weibull RUL',
      },
      {
        title: 'Dynamic Maintenance Runway',
        description: 'Estimated days remaining until safety threshold breach with 90% confidence intervals.',
        tag: 'Prognostics',
      },
    ],
    technicalArchitecture: [
      { component: 'Prognostics Engine', technology: 'PyTorch LSTM / Temporal Fusion Transformer', status: 'Milestone 3' },
      { component: 'Reliability Stats', technology: 'Lifelines Survival Analysis', status: 'Milestone 3' },
      { component: 'Runway Calculator', technology: 'FastAPI Async Inference Worker', status: 'Milestone 3' },
    ],
  },
  '/maintenance-history': {
    title: 'Maintenance Logs & CMMS Integration',
    subtitle: 'Historical work orders, lubrication records, component replacements, and audit logs',
    milestone: 'Milestone 2',
    icon: Wrench,
    description:
      'Complete maintenance management hub synchronizing reliability work orders, technician interventions, grease lubrication schedules, and component replacement history.',
    plannedFeatures: [
      {
        title: 'CMMS Bidirectional Sync',
        description: 'Connects directly with enterprise maintenance systems such as SAP PM and IBM Maximo.',
        tag: 'CMMS API',
      },
      {
        title: 'Lubrication & Greasing Log',
        description: 'Tracks grease replenishment cycles, synthetic lubricant grades, and bearing ultrasonic levels.',
        tag: 'Work Orders',
      },
      {
        title: 'Failure Mode & Root Cause Logs',
        description: 'Maintains historical MTBF (Mean Time Between Failures) and MTTR (Mean Time to Repair) metrics.',
        tag: 'Audit Trail',
      },
    ],
    technicalArchitecture: [
      { component: 'CMMS Connector', technology: 'REST / GraphQL Enterprise Integrations', status: 'Milestone 2' },
      { component: 'Audit Store', technology: 'PostgreSQL Relational DB', status: 'Milestone 2' },
    ],
  },
  '/settings': {
    title: 'Platform & Sensor Node Settings',
    subtitle: 'ESP32 MQTT broker credentials, sampling rate, ISO limits, and notification routing',
    milestone: 'Milestone 2',
    icon: Settings,
    description:
      'System administration console for provisioning IoT sensor nodes, configuring WiFi and MQTT endpoints, setting custom vibration threshold rules, and integrating Slack/PagerDuty webhooks.',
    plannedFeatures: [
      {
        title: 'ESP32 Provisioning & MQTT Setup',
        description: 'Configure device hostnames, broker IP, TLS port (8883), and authentication keys.',
        tag: 'IoT Config',
      },
      {
        title: 'Threshold & Alert Rule Builder',
        description: 'Customize ISO 10816 velocity alert boundaries, temperature limits, and rate-of-change rules.',
        tag: 'Rules Engine',
      },
      {
        title: 'Notification Webhook Dispatcher',
        description: 'Route critical machine alarms to Slack, Microsoft Teams, SMS, and Email.',
        tag: 'Webhooks',
      },
    ],
    technicalArchitecture: [
      { component: 'Secrets Vault', technology: 'FastAPI Environment Config', status: 'Milestone 2' },
      { component: 'Device Registry', technology: 'PostgreSQL Device Table', status: 'Milestone 2' },
    ],
  },
};

export const PlaceholderPage: React.FC = () => {
  const location = useLocation();
  const config = MODULE_CONFIGS[location.pathname] || {
    title: 'Upcoming Industrial Feature',
    subtitle: 'This module is scheduled for development in a subsequent milestone',
    milestone: 'Milestone 2' as const,
    icon: Layers,
    description:
      'The requested module is under active architectural design and will connect with the FastAPI backend and ESP32 hardware in later milestones.',
    plannedFeatures: [],
    technicalArchitecture: [],
  };

  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Return to Overview Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview Dashboard</span>
        </Link>

        <DemoTag label="PLANNED MODULE" />
      </div>

      {/* Main Hero Card */}
      <div className="rounded-xl bg-white dark:bg-[#0d121e] border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 shadow-sm dark:shadow-none theme-transition">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 pb-6 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 shadow-sm">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {config.title}
                </h1>
                <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-md bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30">
                  Scheduled: {config.milestone}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {config.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <Link
              to="/"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold transition-colors flex items-center gap-2"
            >
              <span>View Milestone 1 Dashboard</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
        </div>

        {/* Milestone Scope Notice */}
        <div className="mt-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 font-mono text-amber-700 dark:text-amber-400 font-semibold mb-1">
            <Clock className="w-4 h-4" />
            <span>Development Roadmap & Architectural Boundary:</span>
          </div>
          <p>
            {config.description} As defined in the project roadmap, <strong>Milestone 1</strong> strictly focuses on the frontend application shell, design system, and Overview dashboard with validated mock telemetry. Live ESP32 firmware, MQTT communication, and Python ML pipelines will be linked here in <strong>{config.milestone}</strong>.
          </p>
        </div>

        {/* Planned Capabilities Grid */}
        <div className="mt-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-4">
            Key Capabilities Scheduled for {config.milestone}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.plannedFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-slate-700 font-medium">
                      {feat.tag}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      Phase {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>Specification defined</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Spec Table */}
        <div className="mt-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span>Target Tech Stack & Integration Protocol</span>
          </h2>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="py-2.5 px-4 font-semibold uppercase text-[10px]">Architecture Layer</th>
                  <th className="py-2.5 px-4 font-semibold uppercase text-[10px]">Technology / Standard</th>
                  <th className="py-2.5 px-4 font-semibold uppercase text-[10px]">Integration Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                {config.technicalArchitecture.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40">
                    <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-slate-200">{row.component}</td>
                    <td className="py-2.5 px-4 text-emerald-700 dark:text-emerald-400">{row.technology}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
