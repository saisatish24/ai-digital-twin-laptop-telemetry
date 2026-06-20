
import { useState } from "react";
import api from "../services/api";
import "../styles/TwinStatus.css";
import useAutoRefresh from "../utils/autoRefresh";

function TwinStatus() {

    const [telemetry, setTelemetry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadTelemetry() {

        try {

            const response =
                await api.get("/telemetry/latest");

            setTelemetry(response.data);
            setError("");

        } catch (error) {

            console.error(error);

            setError(
                "Waiting for telemetry service..."
            );

        } finally {

            setLoading(false);

        }

    }

    useAutoRefresh(
        loadTelemetry,
        5000
    );

    
if (loading) {

    return (
        <div className="status-loading">
            Loading system status...
        </div>
    );

}

if (error) {

    return (
        <div className="status-error">
            Waiting for telemetry service...
        </div>
    );

}



    return (

        <div className="status-container">

            <h2 className="status-title">
                Current System Status
            </h2>

            <div className="status-grid">

                <div className="status-card">
                    <h3>CPU Temp</h3>
                    <p
                        style={{
                            color:
                                telemetry.cpu_temperature_c > 80
                                    ? "#ef4444"
                                    : "#22c55e"
                        }}
                    >
                        {telemetry.cpu_temperature_c}°C
                    </p>
                </div>

                <div className="status-card">
                    <h3>CPU Load</h3>
                    <p>
                        {telemetry.cpu_utilization_pct}%
                    </p>
                </div>

                <div className="status-card">
                    <h3>Battery</h3>
                    <p>
                        {telemetry.battery_health_pct}%
                    </p>
                </div>

                <div className="status-card">
                    <h3>Disk</h3>
                    <p>
                        {telemetry.disk_health_pct}%
                    </p>
                </div>

                <div className="status-card">
                    <h3>Thermal</h3>

                    <p
                        className={
                            telemetry.thermal_state
                                .toLowerCase()
                        }
                    >
                        {telemetry.thermal_state}
                    </p>

                </div>

            </div>

        </div>

    );

}

export default TwinStatus;

