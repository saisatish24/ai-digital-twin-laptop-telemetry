# Telemetry Schema Documentation

# AI Digital Twin for Laptop Telemetry

## Overview

The Digital Twin uses synthetic but relationship-driven telemetry to model laptop behavior.

Unlike simple random value generation, the telemetry engine creates correlated system metrics that mimic realistic hardware behavior.

This document describes the telemetry schema used throughout the platform.

---

# Telemetry Record Structure

Each telemetry record represents a snapshot of the laptop state.

Example:

```json
{
  "timestamp": "2026-06-20T10:00:00Z",
  "cpu_utilization_pct": 33,
  "cpu_temperature_c": 64,
  "gpu_temperature_c": 58,
  "memory_utilization_pct": 49,
  "fan_speed_rpm": 2100,
  "battery_drain_w": 8.5,
  "battery_health_pct": 96.23,
  "disk_health_pct": 98.5,
  "wifi_signal_dbm": -58,
  "cpu_frequency_ghz": 2.8,
  "power_mode": "BALANCED",
  "thermal_state": "NORMAL"
}
```

---

# Field Definitions

## timestamp

### Type

```text
String (ISO 8601)
```

### Description

Timestamp of telemetry collection.

### Example

```text
2026-06-20T10:00:00Z
```

---

# CPU Metrics

## cpu_utilization_pct

### Type

```text
Number
```

### Range

```text
0 - 100
```

### Description

Percentage of CPU utilization.

### Example

```text
33
```

---

## cpu_temperature_c

### Type

```text
Number
```

### Unit

```text
°C
```

### Description

Current CPU temperature.

### Example

```text
64
```

### Relationship

Higher CPU utilization increases power consumption and temperature.

```text
CPU Load ↑
→ CPU Temperature ↑
```

---

## cpu_frequency_ghz

### Type

```text
Number
```

### Unit

```text
GHz
```

### Description

Current operating frequency of the CPU.

### Example

```text
2.8
```

### Relationship

Higher CPU load typically results in higher CPU frequency.

---

# GPU Metrics

## gpu_temperature_c

### Type

```text
Number
```

### Unit

```text
°C
```

### Description

Current GPU temperature.

### Example

```text
58
```

### Relationship

Gaming and graphics-intensive workloads increase GPU temperature.

---

# Memory Metrics

## memory_utilization_pct

### Type

```text
Number
```

### Range

```text
0 - 100
```

### Description

Current memory usage percentage.

### Example

```text
49
```

---

# Cooling Metrics

## fan_speed_rpm

### Type

```text
Number
```

### Unit

```text
RPM
```

### Description

Current cooling fan speed.

### Example

```text
2100
```

### Relationship

Higher temperatures cause higher fan speeds.

```text
Temperature ↑
→ Fan Speed ↑
```

---

# Battery Metrics

## battery_drain_w

### Type

```text
Number
```

### Unit

```text
Watts
```

### Description

Current battery power consumption.

### Example

```text
8.5
```

### Relationship

Higher workloads increase battery drain.

```text
CPU Load ↑
→ Power Consumption ↑
→ Battery Drain ↑
```

---

## battery_health_pct

### Type

```text
Number
```

### Range

```text
0 - 100
```

### Description

Estimated battery health.

### Example

```text
96.23
```

### Relationship

Repeated heat stress gradually degrades battery health.

```text
Heat Stress ↑
→ Battery Wear ↑
→ Battery Health ↓
```

---

# Storage Metrics

## disk_health_pct

### Type

```text
Number
```

### Range

```text
0 - 100
```

### Description

Estimated storage device health.

### Example

```text
98.5
```

### Relationship

Disk health decreases gradually over time.

---

# Connectivity Metrics

## wifi_signal_dbm

### Type

```text
Number
```

### Unit

```text
dBm
```

### Description

WiFi signal strength.

### Example

```text
-58
```

### Interpretation

```text
-30 dBm → Excellent
-50 dBm → Very Good
-70 dBm → Fair
-85 dBm → Poor
```

---

# Power Metrics

## power_mode

### Type

```text
String
```

### Values

```text
POWER_SAVER
BALANCED
PERFORMANCE
```

### Description

Current power profile.

---

# Thermal Metrics

## thermal_state

### Type

```text
String
```

### Values

```text
NORMAL
WARNING
THROTTLING
```

### Description

Current thermal condition of the system.

---

## NORMAL

Temperature within safe operating range.

---

## WARNING

Temperature approaching critical levels.

---

## THROTTLING

System is actively reducing performance to prevent overheating.

---

# Relationship Model

The Digital Twin uses relationship-driven telemetry generation.

Example dependency chain:

```text
Session Type
        ↓
CPU Load
        ↓
Power Consumption
        ↓
CPU Temperature
        ↓
Fan Speed
        ↓
Battery Drain
        ↓
Battery Health
```

This creates realistic system behavior and enables meaningful anomaly detection, prediction, and simulation.

---

# Example Workload Profiles

## Idle Session

```text
CPU Load: 10%
CPU Temp: 45°C
Fan Speed: 1200 RPM
Battery Drain: Low
```

---

## Office Work

```text
CPU Load: 30%
CPU Temp: 60°C
Fan Speed: 1800 RPM
Battery Drain: Moderate
```

---

## Gaming Session

```text
CPU Load: 90%
CPU Temp: 88°C
Fan Speed: 4200 RPM
Battery Drain: High
```

---

# Why This Schema Matters

The telemetry schema serves as the foundation of the Digital Twin.

All major system components depend on telemetry:

```text
Telemetry
     ↓
Anomaly Detection
     ↓
Predictions
     ↓
Simulations
     ↓
AI Assistant
```

Because the telemetry is relationship-based rather than random, the platform can generate realistic diagnostics, predictions, and simulation outcomes.

---

# Conclusion

The telemetry schema defines a realistic virtual representation of laptop behavior through correlated system metrics.

By modeling relationships between CPU load, power consumption, temperature, cooling behavior, battery wear, and system health, the Digital Twin provides a strong foundation for predictive analytics, simulation, and explainable AI reasoning.
