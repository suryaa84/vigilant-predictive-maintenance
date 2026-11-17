# VIGILANT — Intelligent Predictive Maintenance Platform

An AI and IoT predictive maintenance system for industrial rotating machinery (electric motors, pumps, compressors, turbines). The platform monitors tri-axial vibration, acoustic sound emissions, surface casing temperature, and shaft RPM.

---

## Project Status: Milestone 1 (Frontend & UI/UX Dashboard)

This repository contains the first frontend milestone of the VIGILANT SaaS platform. In this milestone:
- **Scope**: Frontend dashboard UI/UX with validated mock/simulated industrial telemetry.
- **Hardware & Backend Notice**: ESP32 sensor hardware, MQTT broker, Python FastAPI backend, and ML inference models will be connected in subsequent milestones.
- **Data Source**: Clearly labelled synthetic datasets conforming to ISO 10816-3 machinery vibration standards.

---

## Technology Stack

- **Framework**: React 19 + TypeScript (Vite)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Charting**: Recharts 3.x (Multi-axis telemetry trends & fault classification donut)
- **Icons**: Lucide React
- **Routing**: React Router 7 (`react-router-dom`)

---

## Quickstart & Running Locally

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Build for production and verify TypeScript:
   ```bash
   npm run build
   ```

5. Run linter:
   ```bash
   npm run lint
   ```

---

## Project Milestones

- [x] **Milestone 1**: Premium industrial SaaS frontend shell, Overview dashboard, simulated telemetry, ISO 10816-3 indicators, machine selector, and module placeholders.
- [ ] **Milestone 2**: ESP32 firmware (ADXL345/Piezo vibration, MAX9814 acoustic, PT100/thermocouple, optical tachometer), Mosquitto MQTT broker, Python FastAPI backend, WebSockets, and TimescaleDB storage.
- [ ] **Milestone 3**: Machine learning fault diagnosis (FFT spectral harmonics, bearing defect frequency classification, Weibull hazard & LSTM Remaining Useful Life prediction).
