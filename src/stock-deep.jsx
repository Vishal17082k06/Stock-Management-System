import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AvailabilityTrendChart from "./AvailabilityTrendChart";

function StockDeep() {
  const location = useLocation();
  const stockId = location.state?.stockId;
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!stockId) return;

    axios.get(`http://localhost:8000/stock/${stockId}/predict`)
      .then(response => {
        const data = response.data.usage_trend;
        if (!data || data.length === 0) {
          setErrorMsg("No usage trend available for this stock.");
        } else {
          setTrendData(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching trend data:", error);
        if (error.response && error.response.status === 404) {
          setErrorMsg(error.response.data.detail || "Trend data not available.");
        } else {
          setErrorMsg("Something went wrong while fetching trend data.");
        }
        setLoading(false);
      });
  }, [stockId]);

  return (
    <div>
      <h2>Stock Availability Trend</h2>
      {loading ? (
        <p>Loading chart...</p>
      ) : errorMsg ? (
        <p style={{ color: "red" }}>{errorMsg}</p>
      ) : (
        <AvailabilityTrendChart data={trendData} />
      )}
    </div>
  );
}

export default StockDeep;
