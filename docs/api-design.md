# API Design Documentation

## AI Digital Twin for Laptop Telemetry

This document describes the REST APIs exposed by the Digital Twin backend.

Base URL:

```text
http://localhost:5000
```

---

# API Categories

The backend APIs are organized into five groups:

1. Telemetry APIs
2. Prediction APIs
3. Anomaly APIs
4. Simulation APIs
5. AI Assistant APIs

---

# 1. Telemetry APIs

## Get Latest Telemetry

Returns the most recent telemetry record.

### Endpoint

```http
GET /telemetry/latest
```

### Response

```json
{
  "timestamp": "2026-06-21T10:00:00Z",
  "cpu_temperature_c": 64,
  "cpu_utilization_pct": 33,
  "memory_utilization_pct": 49,
  "battery_health_pct": 96.23,
  "disk_health_pct": 98.5,
  "thermal_state": "NORMAL"
}
```

### Usage

Used by:

* Twin Status Panel
* Telemetry Viewer
* Health Overview

---

## Get Telemetry History

Returns historical telemetry records.

### Endpoint

```http
GET /telemetry/history
```

### Response

```json
[
  {
    "timestamp": "...",
    "cpu_temperature_c": 62
  },
  {
    "timestamp": "...",
    "cpu_temperature_c": 64
  }
]
```

### Usage

Used by:

* Historical Charts
* Raw Dataset Viewer

---

## Get System Summary

Returns aggregated system statistics.

### Endpoint

```http
GET /telemetry/summary
```

### Response

```json
{
  "average_temperature_c": 64.45,
  "maximum_temperature_c": 95,
  "average_cpu_load_pct": 44.13,
  "warning_events": 13,
  "throttling_events": 5
}
```

### Usage

Used by:

* System Summary Panel

---

# 2. Prediction APIs

## Battery Health Prediction

Predicts battery health degradation.

### Endpoint

```http
GET /predictions/battery
```

### Response

```json
{
  "current_health": 96.23,
  "predicted_health_30_days": 95.15,
  "risk": "LOW"
}
```

---

## Temperature Prediction

Predicts CPU temperature over the next 10 minutes.

### Endpoint

```http
GET /predictions/temperature
```

### Response

```json
{
  "current_temperature": 64,
  "predicted_temperature_10min": 55,
  "trend": "COOLING",
  "risk": "LOW"
}
```

---

## Disk Health Prediction

Predicts future disk health.

### Endpoint

```http
GET /predictions/disk
```

### Response

```json
{
  "current_health": 98.5,
  "predicted_health_30_days": 97.9,
  "risk": "LOW"
}
```

---

# 3. Anomaly APIs

## Detect Anomalies

Analyzes telemetry and returns detected anomalies.

### Endpoint

```http
GET /anomalies
```

### Response

```json
[
  {
    "type": "THERMAL_THROTTLING",
    "severity": "HIGH",
    "message": "5 throttling events detected"
  },
  {
    "type": "FAN_OVERUSE",
    "severity": "LOW",
    "message": "Fan operated at maximum speed for 45 intervals"
  }
]
```

### Usage

Used by:

* Anomaly Panel
* AI Assistant

---

# 4. Simulation APIs

The simulation APIs perform what-if analysis.

---

## Fan Failure Simulation

### Endpoint

```http
GET /simulation/fan-failure
```

### Optional Query Parameters

```http
?load=90
```

### Response

```json
{
  "scenario": "Cooling Fan Failure",
  "predicted_temperature_c": 92,
  "thermal_state": "THROTTLING",
  "risk": "HIGH"
}
```

---

## Desert Heat Simulation

### Endpoint

```http
GET /simulation/desert-heat
```

### Optional Query Parameters

```http
?load=90&ambientTemp=48
```

### Response

```json
{
  "scenario": "Desert Heat",
  "predicted_temperature_c": 94,
  "thermal_state": "WARNING",
  "risk": "HIGH"
}
```

---

## Heavy Compile Simulation

### Endpoint

```http
GET /simulation/heavy-compile
```

### Optional Query Parameters

```http
?load=85
```

### Response

```json
{
  "scenario": "Heavy Compile",
  "predicted_temperature_c": 91,
  "thermal_state": "WARNING",
  "risk": "HIGH"
}
```

### Usage

Used by:

* Simulation Panel
* AI Assistant

---

# 5. AI Assistant API

## Chat With Digital Twin

Provides conversational interaction with the Digital Twin.

### Endpoint

```http
POST /chat
```

### Request

```json
{
  "question": "Why is my laptop hot?"
}
```

### Backend Processing

The backend gathers:

* Current Telemetry
* Prediction Results
* Detected Anomalies
* Relevant Simulation Results

and constructs a context for the AI model.

---

### Response

```json
{
  "answer": "Explanation... Root Cause... Recommendation..."
}
```

### Example Questions

```text
Why is my laptop hot?
Will my battery degrade?
Explain detected anomalies.
What happens if the cooling fan fails?
What happens if I start gaming now?
```

---

# Frontend Integration Flow

Dashboard Components
↓
Axios API Requests
↓
Express Backend APIs
↓
Telemetry / Prediction / Simulation Engines
↓
JSON Response
↓
React Components

---

# Design Principles

The API design follows:

* REST Architecture
* Separation of Concerns
* Modular Controllers
* Predictable JSON Responses
* Reusable Services

This architecture allows frontend components, simulation engines, and AI services to remain loosely coupled and independently maintainable.
